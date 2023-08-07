import { Resolvers } from '~/generated/graphql';
import { userService } from './user.service';
import { AppContext } from '~/common/interfaces/base.interface';

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user }: AppContext) => {
      return await userService.me(user.email);
    },
  },
};
