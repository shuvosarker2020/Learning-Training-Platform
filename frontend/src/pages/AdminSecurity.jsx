import React, { useState } from 'react';
import { 
  ServerCog, 
  ShieldAlert, 
  Database, 
  HardDriveDownload, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Layers, 
  RefreshCw,
  Zap,
  Globe2,
  Terminal
} from 'lucide-react';
import { SYSTEM_METRICS_1M_SCALE } from '../data/mockData';

export default function AdminSecurity() {
  const [metrics, setMetrics] = useState(SYSTEM_METRICS_1M_SCALE);
  const [backupRunning, setBackupRunning] = useState(false);
  const [backupLogs, setBackupLogs] = useState([]);
  const [trafficBurst, setTrafficBurst] = useState(false);

  const triggerAutomatedBackup = () => {
    setBackupRunning(true);
    setBackupLogs([
      `[${new Date().toLocaleTimeString()}] Initiating pg_dump against primary database (isolated tenant)...`,
      `[${new Date().toLocaleTimeString()}] Locking tables with non-blocking WAL snapshot...`,
      `[${new Date().toLocaleTimeString()}] Compressing payload with Zstandard (zstd -9)...`,
      `[${new Date().toLocaleTimeString()}] Encrypting archive with OpenSSL AES-256-GCM (Hardware TPM key)...`,
      `[${new Date().toLocaleTimeString()}] Syncing encrypted blob to multi-region offsite S3 cold vault (s3://ngntc-disaster-recovery)...`,
      `[${new Date().toLocaleTimeString()}] Snapshot complete: SHA-256 verified. RPO preserved (<60s).`
    ]);

    setTimeout(() => {
      setBackupRunning(false);
      setMetrics(prev => ({
        ...prev,
        lastAutomatedBackup: `Just now (${new Date().toISOString()})`
      }));
    }, 2500);
  };

  const simulateTrafficSurge = () => {
    setTrafficBurst(true);
    setMetrics(prev => ({
      ...prev,
      activeConcurrentUsers: prev.activeConcurrentUsers + 125000,
      activeK8sPods: prev.activeK8sPods + 110,
      edgeCdnBandwidthGbps: "530 Gbps"
    }));
    setTimeout(() => setTrafficBurst(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <ServerCog className="w-3.5 h-3.5" />
            <span>Enterprise Infrastructure &amp; Cyber Defense Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            1M User Scalability &amp; Anti-Exfiltration Shield
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Real-time telemetry of high-concurrency Kubernetes clusters, separate database clusters, zero-loss automated backups, and military-grade defense against attackers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={simulateTrafficSurge}
            className="px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-800 hover:bg-purple-900/60 text-purple-300 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span>Simulate Traffic Surge (+125k Users)</span>
          </button>
        </div>
      </div>

      {/* 1 Million Scale Real-time Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30">
          <span className="text-slate-500 text-[10px] uppercase block">Concurrent Users</span>
          <span className="text-lg sm:text-xl font-bold text-cyan-400">
            {metrics.activeConcurrentUsers.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">● Nominal Capacity</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Response Latency</span>
          <span className="text-lg sm:text-xl font-bold text-white">
            {metrics.avgResponseLatencyMs} ms
          </span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">Global Edge P99</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Redis Cache Hit</span>
          <span className="text-lg sm:text-xl font-bold text-white">
            {metrics.redisCacheHitRatio}
          </span>
          <span className="text-[10px] text-cyan-400 block mt-0.5">L1 + L2 Cluster</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">CDN Egress</span>
          <span className="text-lg sm:text-xl font-bold text-white">
            {metrics.edgeCdnBandwidthGbps}
          </span>
          <span className="text-[10px] text-purple-400 block mt-0.5">Anycast Video Edge</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Active K8s Pods</span>
          <span className="text-lg sm:text-xl font-bold text-emerald-400">
            {metrics.activeK8sPods}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Auto-scaled (HPA)</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
          <span className="text-slate-500 text-[10px] uppercase block">Zero-Trust Shield</span>
          <span className="text-lg sm:text-xl font-bold text-emerald-400">
            100%
          </span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">0 Breaches Logged</span>
        </div>
      </div>

      {/* Main Grid: Database Architecture & Backup Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Separate Database Architecture */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Dedicated Database Isolation Architecture
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
              PostgreSQL 16 + Citus Fabric
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The platform is isolated into separate database instances per tenant and microservice. Read requests are distributed across 6 asynchronous read-replicas via PgBouncer connection poolers to prevent query starvation at 1M user scale.
          </p>

          <div className="space-y-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-200 font-bold">Primary Database (Writer Node)</span>
              </div>
              <span className="text-cyan-400">{metrics.databaseStatus.primary}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-slate-200">Read Replica Pool ({metrics.databaseStatus.replicas} Nodes)</span>
              </div>
              <span className="text-slate-400">Replication Lag: {metrics.databaseStatus.avgReplicaLagMs}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-slate-200">PgBouncer Connection Pooling</span>
              </div>
              <span className="text-slate-400">Capacity: {metrics.databaseStatus.pgBouncerPoolUsage} (Max 50,000 conns)</span>
            </div>
          </div>
        </div>

        {/* Right: Automated Backup & Point-in-Time Recovery */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <HardDriveDownload className="w-4 h-4 text-emerald-400" />
              Automated Backup &amp; Disaster Recovery
            </h2>
            <button
              onClick={triggerAutomatedBackup}
              disabled={backupRunning}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${backupRunning ? 'animate-spin' : ''}`} />
              <span>{backupRunning ? 'Backing Up...' : 'Trigger Backup Now'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Recovery Point Objective (RPO):</span>
              <span className="text-emerald-400 font-bold">{metrics.rpoStatus}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Recovery Time Objective (RTO):</span>
              <span className="text-cyan-400 font-bold">{metrics.rtoStatus}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
            <div className="text-slate-400 flex justify-between">
              <span>Last Snapshot:</span>
              <span className="text-slate-200">{metrics.lastAutomatedBackup}</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span>Encryption Algorithm:</span>
              <span className="text-emerald-400">AES-256-GCM (Hardware HSM)</span>
            </div>
            <div className="text-slate-400 flex justify-between">
              <span>Off-site Storage:</span>
              <span className="text-cyan-400">Geo-Replicated Cold Vault (3 Regions)</span>
            </div>
          </div>

          {/* Backup Terminal Log */}
          {backupLogs.length > 0 && (
            <div className="p-3 rounded-xl bg-black border border-slate-800 text-[10px] font-mono text-emerald-400 space-y-1">
              <div className="flex items-center gap-1 text-slate-500 pb-1 border-b border-slate-900">
                <Terminal className="w-3 h-3 text-emerald-400" />
                <span>backup_daemon.log</span>
              </div>
              {backupLogs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Anti-Attacker Defense & Zero Data-Exfiltration Monitor */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Anti-Exfiltration Shield: "Zero Attacker Information Exposure"
          </h2>
          <span className="px-2.5 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800 text-[10px] font-mono font-bold">
            DEFCON 1 ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-cyan-400 font-bold block">1. Dynamic Watermarking</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Every video frame and lab PDF embeds student ID &amp; IP steganography. Leaked files immediately trace back to source.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-purple-400 font-bold block">2. Signed Short-Lived URLs</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Video and documents cannot be shared. Access URLs expire in 15 minutes and bind to the authenticated TLS session.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-emerald-400 font-bold block">3. OWASP Top 10 Neutralization</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Strict parameterized ORM queries, CSP headers, XSS HTML sanitization, and CSRF double-submit cookies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-amber-400 font-bold block">4. Anti-Scraping WAF &amp; Rate Limits</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Cloudflare Edge WAF automatically bans abnormal burst requests, VPN scrape bots, and suspicious automated crawlers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
