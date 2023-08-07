import { IsString } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ProfileInput {
  @IsString()
  @Field()
  bio: string;

  @IsString()
  @Field()
  facebookUrl: string;

  @IsString()
  @Field()
  twitterUrl: string;

  @IsString()
  @Field()
  instagramUrl: string;
}
