import type { Request, Response } from 'express';
import { UserPayload } from '~/modules/auth/auth.interface';

export interface AppContext {
  req: Request;
  res: Response;
  user: UserPayload | null;
}
