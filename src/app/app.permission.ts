import { shield } from 'graphql-shield';
import { isAuthenticated } from '~/common/permissions/auth.permission';

export const permissions = shield({
  Query: {
    me: isAuthenticated,
  },
});
