import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import type { BaseContext } from '~/common/interfaces/base.interface';
import { BaseResponse } from '~/common/models/base.model';
import { jwt, saltOrRound } from '~/common/configs/env.config';
import { LoginInput } from './dtos/login.dto';
import { RegisterInput } from './dtos/register.dto';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import { PasswordService } from './services/password.service';
import { Auth } from './typedefs/auth.type';

@Resolver()
export default class AuthResolver {
  private jwt = new JwtService(jwt);
  private password = new PasswordService(saltOrRound);
  private auth = new AuthService(this.password, this.jwt);

  @Mutation(() => BaseResponse)
  register(@Arg('data') data: RegisterInput) {
    data.email = data.email.toLowerCase();
    return this.auth.register(data);
  }

  @Mutation(() => Auth)
  login(@Arg('data') data: LoginInput, @Ctx() { res }: BaseContext) {
    data.email = data.email.toLowerCase();
    return this.auth.login(data, res);
  }

  @Mutation(() => BaseResponse)
  logout(@Ctx() { req, res }: BaseContext) {
    return this.auth.logout(req, res);
  }

  @Mutation(() => Auth)
  refreshToken(@Ctx() { res, req }: BaseContext) {
    return this.auth.refreshToken(res, req);
  }
}
