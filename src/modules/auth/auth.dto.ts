import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { Match } from '~/common/decorators/match.decorator';

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
export class AutoLoginInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  userId: string;
}

@ObjectType()
export class RegisterInput extends LoginInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  fullName: string;
}

@ObjectType()
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

@ObjectType()
export class VerifyEmailInput {
  @IsString()
  @IsNotEmpty()
  token: string;
}

@ObjectType()
export class SendVerificationEmailInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

@ObjectType()
export class ResetPasswordInput {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: 'Confirm password must be the same as password',
  })
  confirmPassword: string;
}

@ObjectType()
export class ChangePasswordInput {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Match('newPassword', {
    message: 'Confirm password must be the same as password',
  })
  confirmPassword: string;
}

@ObjectType()
export class ChangeEmailRequestInput {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

@ObjectType()
export class ChangeEmailInput {
  @IsString()
  @IsNotEmpty()
  token: string;
}
