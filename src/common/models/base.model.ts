import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class BaseModel extends BaseEntity {
  @Field(() => ID)
  id: string;

  @Field({
    description: 'Identifies the date and time when the object was created.',
  })
  createdAt: Date;

  @Field({
    description: 'Identifies the date and time when the object was last updated.',
  })
  updatedAt: Date;
}

@ObjectType({ isAbstract: true })
export abstract class BaseResponse {
  @Field()
  statusCode: number;

  @Field()
  message: string;

  @Field()
  status: boolean;
}
