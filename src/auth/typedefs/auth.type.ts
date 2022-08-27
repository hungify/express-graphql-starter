import { ObjectType } from 'type-graphql';
import type { User } from '~/user/typedefs/user.type';
import { Token } from './token.type';

@ObjectType()
export class Auth extends Token {
  public user: User;
}
