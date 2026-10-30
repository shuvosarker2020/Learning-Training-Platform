import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ngntc-enterprise-zero-trust-secret-key-9824!';

/**
 * Verify Zero-Trust JWT session token
 */
export function verifyZeroTrustToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      error: 'Access Denied: Missing Zero-Trust Security Token',
      code: 'AUTH_TOKEN_MISSING'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      error: 'Security Token Expired or Invalid',
      code: 'AUTH_TOKEN_INVALID'
    });
  }
}

/**
 * Role-Based Access Control (RBAC)
 */
export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient privileges for this enterprise resource',
        code: 'INSUFFICIENT_PERMISSIONS'
      });
    }
    next();
  };
}

/**
 * Generate Short-Lived Anti-Leak Signed Token
 * Encodes student ID, client IP, and short expiry timestamp
 */
export function generateSignedContentToken(userId, ipAddress, resourceId, durationMinutes = 15) {
  return jwt.sign(
    {
      sub: userId,
      ip: ipAddress,
      res: resourceId,
      purpose: 'STREAMING_DECRYPT',
      watermarkToken: `WM-${userId}-${Date.now().toString(36)}`
    },
    JWT_SECRET,
    { expiresIn: `${durationMinutes}m` }
  );
}
