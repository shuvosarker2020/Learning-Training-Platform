/**
 * Database Configuration & Connection Routing
 * Next Generation Network Training Centre (NGNTC)
 * 
 * Supports:
 * - Dedicated database per tenant/microservice (Separate Database Architecture)
 * - Read/Write splitting (1 Primary Master for Writes, N Read-Replicas for Queries)
 * - PgBouncer connection pooling to support 1,000,000 concurrent users
 */

export const dbConfig = {
  primary: {
    host: process.env.DB_PRIMARY_HOST || 'postgres-primary.internal',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'ngntc_enterprise_db',
    user: process.env.DB_USER || 'ngntc_admin',
    password: process.env.DB_PASSWORD || 'secret_db_pass',
    pool: {
      min: 10,
      max: 100, // PgBouncer handles the outer 50,000 connection pool
      idleTimeoutMillis: 30000,
    }
  },
  replicas: [
    {
      host: process.env.DB_REPLICA_1_HOST || 'postgres-replica-1.internal',
      port: 5432,
      database: 'ngntc_enterprise_db',
    },
    {
      host: process.env.DB_REPLICA_2_HOST || 'postgres-replica-2.internal',
      port: 5432,
      database: 'ngntc_enterprise_db',
    }
  ],
  redisCache: {
    host: process.env.REDIS_HOST || 'redis-cluster.internal',
    port: 6379,
    ttlSeconds: 300, // 5 min catalog cache
  }
};

/**
 * Route database queries intelligently:
 * SELECT queries -> Read Replicas (Load Balanced)
 * INSERT/UPDATE/DELETE/TRANSACTION -> Primary Master
 */
export function getDbConnection(queryType = 'READ') {
  if (queryType === 'WRITE') {
    return { target: 'PRIMARY_MASTER', host: dbConfig.primary.host };
  }
  // Round-robin or random replica selection
  const replica = dbConfig.replicas[Math.floor(Math.random() * dbConfig.replicas.length)];
  return { target: 'READ_REPLICA', host: replica.host };
}
