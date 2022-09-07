import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseModel } from '~/common/models/base.model';
import { Roles } from '~/common/configs/role.config';

registerEnumType(Roles, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
@Entity()
export class User extends BaseModel {
  @Field({ name: 'id' })
  _id: string;

  @Field()
  @PrimaryColumn({ unique: true, nullable: false })
  email!: string;

  @Field({ nullable: false })
  @Column()
  fullName!: string;

  @Column()
  password!: string;

  @Column({ default: 0 })
  tokenVersion: number;

  // @Field(() => Role)
  // role: Role;
}
