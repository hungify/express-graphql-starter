import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type TokenType = 'accessToken' | 'refreshToken';

type UserToPayload = Pick<User, 'email' | 'isVerified' | 'role' | 'id'>;

export interface UserPayload extends JwtPayload, UserToPayload {}
