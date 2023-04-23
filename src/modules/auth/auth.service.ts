import { Response } from 'express';
import { GraphQLError } from 'graphql';
import { userRepository } from '../users/user.repository';
import { LoginInput, RegisterInput } from './auth.dto';
import { authHelper } from './auth.helper';
import { passwordService } from './password.service';

export const authService = {
  async register(input: RegisterInput, res: Response) {
    const foundEmail = await userRepository.getByEmail(input.email);
    if (foundEmail) throw new GraphQLError('Email already exists');
    const newUser = await userRepository.create(input);
    Object.assign(newUser, { password: undefined });

    const accessToken = await authHelper.signInTokenAndSetCookie(newUser, res);
    const info = await authHelper.sendVerifyEmail(input.email, accessToken);

    if (!info) throw new GraphQLError('Email not sent');

    return {
      message: 'Please check your email to verify your account',
    };
  },
  async verify(token: string) {
    const { email } = authHelper.verifyToken(token, 'accessToken');

    const foundUser = await userRepository.findUniqueByEmail(email);
    if (!foundUser) throw new GraphQLError('User not found');

    await userRepository.updateIsVerified(email);

    return {
      message: 'Verify successfully',
    };
  },
  async login(input: LoginInput, res: Response) {
    const user = await userRepository.getByEmail(input.email);
    if (!user) throw new Error('User not found');

    const isPasswordCorrect = passwordService.verify(input.password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    return await authHelper.signInTokenAndSetCookie(user, res);
  },
};
