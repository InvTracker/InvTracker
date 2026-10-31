import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../types/auth.js';
import { firebaseAuth } from '../config/firebase.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';

export function determineUserRole(email?: string, customClaimRole?: string): UserRole {
  if (customClaimRole && ['admin', 'kitchen', 'student'].includes(customClaimRole)) {
    return customClaimRole as UserRole;
  }

  if (!email) {
    return 'student';
  }

  const normalized = email.toLowerCase().trim();
  if (env.ADMIN_EMAILS.some((adm) => adm.toLowerCase() === normalized)) {
    return 'admin';
  }
  if (env.KITCHEN_EMAILS.some((kit) => kit.toLowerCase() === normalized)) {
    return 'kitchen';
  }

  return 'student';
}

export async function authenticateUser(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or malformed Authorization header. Expected Bearer <token>.'));
  }

  const token = authHeader.split('Bearer ')[1]?.trim();
  if (!token) {
    return next(new UnauthorizedError('Bearer token is empty'));
  }

  // Development bypass token for local offline testing
  if (env.NODE_ENV !== 'production' && token.startsWith('dev_token_')) {
    const parts = token.split('_');
    const roleCandidate = parts[2] as UserRole;
    const role: UserRole = ['admin', 'kitchen', 'student'].includes(roleCandidate) ? roleCandidate : 'student';
    req.user = {
      uid: `dev-usr-${role}`,
      email: role === 'admin' ? env.ADMIN_EMAILS[0] || 'admin@campus.edu' : role === 'kitchen' ? env.KITCHEN_EMAILS[0] || 'kitchen@campus.edu' : 'student@campus.edu',
      role,
      name: `Dev ${role.toUpperCase()} User`,
      emailVerified: true
    };
    return next();
  }

  try {
    const auth = firebaseAuth();
    const decodedToken = await auth.verifyIdToken(token, true);

    const email = decodedToken.email;
    const role = determineUserRole(email, decodedToken.role as string | undefined);

    req.user = {
      uid: decodedToken.uid,
      email: email || '',
      role,
      name: decodedToken.name || (decodedToken.displayName as string | undefined),
      picture: decodedToken.picture,
      emailVerified: decodedToken.email_verified
    };

    next();
  } catch (err: unknown) {
    const firebaseErr = err as { code?: string; message?: string };
    logger.warn({ code: firebaseErr.code, message: firebaseErr.message }, 'Firebase token verification failed');

    if (firebaseErr.code === 'auth/id-token-expired') {
      return next(new UnauthorizedError('Firebase ID token has expired. Please refresh your session.', { code: 'TOKEN_EXPIRED' }));
    }
    if (firebaseErr.code === 'auth/id-token-revoked') {
      return next(new UnauthorizedError('Firebase ID token has been revoked. Please sign in again.', { code: 'TOKEN_REVOKED' }));
    }

    return next(new UnauthorizedError('Invalid or unverified Firebase ID token.', { code: 'INVALID_TOKEN' }));
  }
}

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('User authentication must precede role verification.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(
        {
          uid: req.user.uid,
          email: req.user.email,
          userRole: req.user.role,
          allowedRoles,
          path: req.originalUrl
        },
        'Forbidden: User role does not meet endpoint permission requirements'
      );

      return next(
        new ForbiddenError(
          `Access denied: Users with role "${req.user.role}" cannot access this section`,
          {
            requiredRoles: allowedRoles,
            currentRole: req.user.role
          }
        )
      );
    }

    next();
  };
}
