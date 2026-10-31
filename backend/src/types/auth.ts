import { Request } from 'express';

export type UserRole = 'student' | 'kitchen' | 'admin';

export interface AuthUser {
  uid: string;
  email: string;
  role: UserRole;
  name?: string;
  picture?: string;
  emailVerified?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      requestId: string;
      idempotencyKey?: string;
    }
  }
}

export type AuthenticatedRequest = Request;
