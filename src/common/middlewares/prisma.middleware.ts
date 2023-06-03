import { passwordService } from '~/modules/auth/password.service';
import { Prisma } from '@prisma/client';
import prisma from '../utils/prisma.util';

const passwordMiddleware: Prisma.Middleware = async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'create' || params.action === 'update') {
      if (params.args.data.password) {
        const hashedPass = await passwordService.hash(params.args.data.password);
        params.args.data.password = hashedPass;
      }
    }
  }
  return next(params);
};

export const loadPrismaMiddlewares = () => {
  prisma.$use(passwordMiddleware);
};
