import { User } from '@prisma/client';
import type { Request, Response } from 'express';
import type Jwt from 'jsonwebtoken';

export type UserJwtPayload = Pick<User, 'email'>;

export type JwtPayloadContext = UserJwtPayload & Jwt.JwtPayload;
export interface AppContext {
  req: Request;
  res: Response;
  user?: UserJwtPayload;
  accessToken?: string;
}
