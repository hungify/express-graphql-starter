import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  SendVerificationEmailInput,
  VerifyEmailInput,
  ChangePasswordInput,
  ChangeEmailRequestInput,
  ChangeEmailInput,
  AutoLoginInput,
} from './auth.dto';
import { Resolvers } from '~/generated/graphql';
import { authService } from './auth.service';
import { AppContext } from '~/common/interfaces/base.interface';

export const resolvers: Resolvers = {
  Mutation: {
    async register(_, args: RegisterInput) {
      const message = await authService.register(args);
      return message;
    },
    async login(_, args: LoginInput, { res }: AppContext) {
      const accessToken = await authService.login(args, res);
      return {
        accessToken,
      };
    },
    async autoLogin(_, args: AutoLoginInput, { res }: AppContext) {
      const accessToken = await authService.autoLogin(args, res);
      return {
        accessToken,
      };
    },
    async verifyEmail(_, { token }: VerifyEmailInput) {
      const message = await authService.verifyEmail(token);
      return message;
    },
    async sendVerificationEmail(_, { email }: SendVerificationEmailInput) {
      const message = await authService.sendVerificationEmail(email);
      return message;
    },
    forgotPassword(_, { email }: SendVerificationEmailInput) {
      const message = authService.forgotPassword(email);
      return message;
    },
    async resetPassword(_, args: ResetPasswordInput) {
      const message = await authService.resetPassword(args);
      return message;
    },
    async changePassword(_, args: ChangePasswordInput, { user }: AppContext) {
      const message = await authService.changePassword(args, user);
      return message;
    },
    async changeEmailRequest(
      _,
      { email }: ChangeEmailRequestInput,
      { user }: AppContext,
    ) {
      const message = await authService.changeEmailRequest(email, user);
      return message;
    },
    async changeEmail(_, args: ChangeEmailInput) {
      const message = await authService.changeEmail(args);
      return message;
    },
  },
};
