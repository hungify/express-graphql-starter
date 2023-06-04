import { User } from '@prisma/client';

export type TokenType =
  | 'accessToken'
  | 'refreshToken'
  | 'verifyEmailToken'
  | 'changeEmailToken'
  | 'changePasswordToken';

export interface UserPayload extends Omit<User, 'password'> {}

interface EmailPayload extends Pick<User, 'email'> {}

export type AuthJwtPayload = UserPayload | EmailPayload;
