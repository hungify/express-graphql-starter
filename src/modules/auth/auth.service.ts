import { Response } from 'express';
import { GraphQLError } from 'graphql';
import {
  AutoLoginInput,
  ChangeEmailInput,
  ChangePasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from './auth.dto';
import { authHelper } from './auth.helper';
import { passwordService } from './password.service';
import { userRepository } from '../user/user.repository';
import { UserPayload } from './auth.interface';
import { userService } from '../user/user.service';

export const authService = {
  async register(input: RegisterInput) {
    const foundEmail = await userRepository.getByEmail(input.email);
    if (foundEmail) throw new GraphQLError('Email already exists');

    const token = authHelper.signInToken(
      {
        email: input.email,
      },
      'verifyEmailToken',
    );
    const info = await authHelper.sendVerifyEmail(input.email, token);

    if (info.accepted.length === 0) throw new GraphQLError('Email not sent');

    const newUser = await userService.createUser(input);
    Object.assign(newUser, { password: undefined });

    return {
      message: 'Please check your email to verify your account',
    };
  },
  async verifyEmail(token: string) {
    const { email } = authHelper.verifyToken(token, 'verifyEmailToken');

    const foundUser = await userRepository.findUniqueByEmail(email);

    if (!foundUser) throw new GraphQLError('User not found');

    if (foundUser.isVerified) throw new GraphQLError('Email already verified');

    await userRepository.updateIsVerified(email);

    return {
      message: 'Verify successfully',
    };
  },
  async sendVerificationEmail(email: string) {
    const foundUser = await userRepository.getByEmail(email);
    if (!foundUser) throw new GraphQLError('User not found');

    if (foundUser.isVerified) throw new GraphQLError('Email already verified');

    const token = authHelper.signInToken(
      {
        email: foundUser.email,
      },
      'verifyEmailToken',
    );
    const info = await authHelper.sendVerifyEmail(email, token);

    if (!info) throw new GraphQLError('Email not sent');

    return {
      message: 'Please check your email to verify your account',
    };
  },
  async login(input: LoginInput, res: Response) {
    const user = await userRepository.getByEmail(input.email);
    if (!user) throw new Error('User not found');

    const isPasswordCorrect = await passwordService.verify(input.password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    return await authHelper.signInTokenAndSetCookie(user, res);
  },
  async autoLogin({ userId }: AutoLoginInput, res: Response) {
    const user = await userRepository.findUniqueById(userId);
    if (!user) throw new Error('User not found');

    return await authHelper.signInTokenAndSetCookie(user, res);
  },
  async forgotPassword(email: string) {
    const user = await userRepository.getByEmail(email);
    if (!user) throw new Error('User not found');

    const token = authHelper.signInToken(
      {
        email: user.email,
      },
      'changePasswordToken',
    );
    const info = await authHelper.sendVerifyEmail(email, token);

    if (!info) throw new GraphQLError('Email not sent');

    return {
      message: 'Please check your email to reset your password',
    };
  },
  async resetPassword(args: ResetPasswordInput) {
    const { token, password } = args;

    const { email } = authHelper.verifyToken(token, 'changePasswordToken');

    const foundUser = await userRepository.getByEmail(email);

    if (!foundUser) throw new GraphQLError('User not found');

    const hashedPassword = await passwordService.hash(password);

    await userRepository.updatePassword(email, hashedPassword);

    return {
      message: 'Reset password successfully',
    };
  },
  async changePassword(args: ChangePasswordInput, user: UserPayload) {
    const { oldPassword, newPassword } = args;

    const foundUser = await userRepository.getByEmail(user.email);

    if (!foundUser) throw new GraphQLError('User not found');

    const isPasswordCorrect = passwordService.verify(oldPassword, foundUser.password);

    if (!isPasswordCorrect) throw new GraphQLError('Old password is incorrect');

    if (newPassword !== foundUser.password) {
      throw new GraphQLError('New password must be different from current password');
    }

    const hashedPassword = await passwordService.hash(newPassword);

    await userRepository.updatePassword(user.email, hashedPassword);

    return {
      message: 'Change password successfully',
    };
  },
  async changeEmailRequest(email: string, user: UserPayload) {
    const foundUser = await userRepository.getByEmail(user.email);

    if (foundUser) throw new GraphQLError('Email already exists');

    const accessToken = authHelper.signInToken(
      {
        email: user.email,
      },
      'changeEmailToken',
    );
    const info = await authHelper.sendVerifyEmail(email, accessToken);

    if (!info) throw new GraphQLError('Email not sent');

    return {
      message: 'Please check your email to verify your account',
    };
  },
  async changeEmail({ token }: ChangeEmailInput) {
    const { email } = authHelper.verifyToken(token, 'changeEmailToken');

    const foundUser = await userRepository.getByEmail(email);

    if (!foundUser) throw new GraphQLError('User not found');

    await userRepository.updateEmail(foundUser.email, email);

    return {
      message: 'Verify successfully',
    };
  },
};
