import bootstrap from './app';
import AuthResolver from './auth/auth.resolver';
import UserResolver from './user/users.resolver';

bootstrap().catch((err) => {
  console.error(err);
});
