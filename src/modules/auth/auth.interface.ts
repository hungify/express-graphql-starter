import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type TokenType =
  | 'accessToken'
  | 'refreshToken'
  | 'verifyEmailToken'
  | 'changeEmailToken'
  | 'changePasswordToken';

export interface UserPayload extends JwtPayload, Omit<User, 'password'> {}
interface EmailPayload extends Pick<User, 'email'> {}

export type AuthJwtPayload = UserPayload | EmailPayload;
