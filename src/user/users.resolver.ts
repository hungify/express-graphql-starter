import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import type { BaseContext } from '~/common/interfaces/base.interface';
import { checkAuth } from '~/common/middlewares/auth.middleware';
import { UserService } from './services/user.service';
import { User } from './typedefs/user.type';

@Resolver()
export default class UserResolver {
  private user = new UserService();

  @UseMiddleware(checkAuth)
  @Query(() => User)
  async me(@Ctx() { user }: BaseContext) {
    const foundUser = User.findOne({ where: { email: user.email } });
    return foundUser;
  }

  @UseMiddleware(checkAuth)
  @Query(() => [User])
  async getUsers() {
    return this.user.getUsers();
  }
}
