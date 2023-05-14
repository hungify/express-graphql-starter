import { AppContext } from '~/common/interfaces/base.interface';
import { Resolvers } from '~/generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user }: AppContext) => {
      return user;
    },
  },
};
