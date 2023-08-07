import { Resolvers } from '~/generated/graphql';

export const resolvers: Resolvers = {
  Query: {
    hi: () => 'Hello World!',
  },
};
