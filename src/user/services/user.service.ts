import { User } from '../typedefs/user.type';

export class UserService {
  async getUsers(): Promise<User[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}
