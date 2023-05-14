import { GraphQLError } from 'graphql';
import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  if (!ctx.user) {
    return new GraphQLError('Not authenticated');
  }
  return true;
});

export const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx) => {
  return ctx.user.role === 'admin';
});
