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

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
  requestId: string;
  idempotencyKey?: string;
}

