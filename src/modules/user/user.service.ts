import { GraphQLError } from 'graphql';
import { userRepository } from './user.repository';
import { RegisterInput } from '../auth/auth.dto';
import { ProfileInput } from './user.dto';

export const userService = {
  async updateProfile(userId: string, userProfile: ProfileInput) {
    const createdUser = await userRepository.updateProfile(userId, userProfile);
    return createdUser;
  },
  async createUser(user: RegisterInput) {
    const createdUser = await userRepository.create(user);
    return createdUser;
  },

  async me(email: string) {
    const foundMe = await userRepository.findUniqueByEmail(email);
    if (!foundMe) throw new GraphQLError('User not found');
    foundMe.password = null;

    return foundMe;
  },
};
