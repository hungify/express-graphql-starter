import bootstrap from './app';
import AppResolver from './app.resolver';
import AuthResolver from './auth/auth.resolver';
import type { Resolvers } from './common/interfaces/resolvers.interface';
import UserResolver from './user/users.resolver';

const resolvers: Resolvers = [AppResolver, UserResolver, AuthResolver];

bootstrap(resolvers);
