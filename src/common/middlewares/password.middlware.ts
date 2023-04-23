import { passwordService } from '~/modules/auth/password.service';
import prisma from '../utils/prisma.util';

export const hashPasswordMiddleware = async () => {
  prisma.$use(async (params, next) => {
    if (params.model === 'User') {
      if (params.action === 'create' || params.action === 'update') {
        if (params.args.data.password) {
          const hashedPass = passwordService.hash(params.args.data.password);
          params.args.data.password = hashedPass;
        }
      }
    }
    return next(params);
  });
};
