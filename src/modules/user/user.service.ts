import { GraphQLError } from 'graphql';
import { userRepository } from './user.repository';

export const userService = {
  async me(email: string) {
    const foundMe = await userRepository.findUniqueByEmail(email);
    if (!foundMe) throw new GraphQLError('User not found');
    foundMe.password = null;

    return foundMe;
  },
};
