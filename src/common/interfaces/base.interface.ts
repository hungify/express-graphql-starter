import type { Request, Response } from 'express';
import type Jwt from 'jsonwebtoken';
import type { User } from '~/user/typeDefs/user.defs';

export type UserJwtPayload = Pick<User, 'email'>;

export type JwtPayloadContext = UserJwtPayload & Jwt.JwtPayload;

export interface BaseContext {
  req: Request;
  res: Response;
  user: UserJwtPayload;
}
