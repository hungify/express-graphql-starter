import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginInput {
  @IsNotEmpty()
  @Field()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  @Length(6, 56)
  password: string;
}

@ObjectType()
export class RegisterInput extends LoginInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  fullName: string;
}

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  subject: 'Verify your email' | 'Reset your password';

  @IsNotEmpty()
  type: 'register' | 'forgot-password';

  @IsString()
  @IsNotEmpty()
  verifyUrl: string;
}
