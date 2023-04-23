import prisma from '~/common/utils/prisma.util';
import { LoginInput, RegisterInput } from './auth.dto';
import { Resolvers } from '~/generated/graphql';
import { authService } from './auth.service';
import { AppContext } from '~/common/interfaces/base.interface';

export const resolvers: Resolvers = {
  Mutation: {
    async register(_, args: RegisterInput, { res }: AppContext) {
      const message = await authService.register(args, res);
      return message;
    },
    async login(_, args: LoginInput, { res }: AppContext) {
      const accessToken = await authService.login(args, res);
      return {
        accessToken,
      };
    },
  },
};
