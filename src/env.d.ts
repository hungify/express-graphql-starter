import { UserPayload } from './modules/auth/auth.interface';

export {};

declare global {
  namespace NodeJS {}
}

declare module 'jsonwebtoken' {
  interface JwtPayload extends UserPayload {}
}
