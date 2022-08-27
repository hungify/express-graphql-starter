import { GraphQLJWT } from 'graphql-scalars';
import { Field, ObjectType } from 'type-graphql';
import { BaseResponse } from '~/common/models/base.model';

@ObjectType()
export class Token extends BaseResponse {
  @Field(() => GraphQLJWT, { description: 'JWT access token' })
  accessToken: string;

  // @Field(() => GraphQLJWT, { description: 'JWT refresh token' })
  // refreshToken: string;
}
