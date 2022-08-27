import type { CookieOptions, Request, Response } from 'express';
import {
  BadRequestException,
  ConflictException,
  InternalServerException,
  NotFoundException,
  UnauthorizedException,
} from '~/common/exceptions';
import type { BaseResponse } from '~/common/models/base.model';
import { dayToSeconds } from '~/common/utils/date.util';
import { jwt } from '~/configs/env.config';
import { User } from '~/user/typedefs/user.type';
import type { LoginInput } from '../dtos/login.dto';
import type { RegisterInput } from '../dtos/register.dto';
import type { Token } from '../typedefs/token.type';
import { JwtService } from './jwt.service';
import type { PasswordService } from './password.service';

export class AuthService {
  constructor(
    private readonly password: PasswordService,
    private readonly jwt: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<BaseResponse> {
    const { email, password, fullName } = registerInput;
    const existsUser = await User.findOne({ where: { email } });
    if (existsUser) {
      throw new ConflictException({
        message: `User with email ${email} already exists`,
      });
    }
    const hashedPassword = await this.password.hashed(password);

    const newUser = User.create({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      message: 'success',
      statusCode: 201,
      status: true,
    };
  }

  async login(loginInput: LoginInput, res: Response): Promise<Token> {
    const { email, password } = loginInput;
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      throw new NotFoundException({
        message: `User with email ${email} not found`,
      });
    }

    const isValidPassword = await this.password.compare(password, foundUser.password);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        message: 'Email or password is incorrect',
      });
    }

    const accessToken = await this.jwt.signInAccessToken(foundUser);
    const refreshToken = await this.jwt.signInRefreshToken(foundUser);

    if (!accessToken || !refreshToken) {
      throw new InternalServerException({
        message: 'Error while generating tokens',
      });
    }

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 years

      // maxAge: dayToSeconds(jwt.refreshTokenExpiresIn),
      // path: '/refresh-token',
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    return {
      accessToken,
      message: 'success',
      statusCode: 200,
      status: true,
    };
  }

  async logout(req: Request, res: Response): Promise<BaseResponse> {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      throw new BadRequestException({
        message: 'Refresh token is required',
      });

    const jwtService = new JwtService(jwt);
    const { email } = await jwtService.verifyRefreshToken(refreshToken);
    if (!email) throw new UnauthorizedException({ message: 'Invalid refresh token' });

    const foundUser = await User.findOne({ where: { email } });
    foundUser.tokenVersion += 1;
    await foundUser.save();
    res.clearCookie('refreshToken');
    return {
      message: 'success',
      statusCode: 200,
      status: true,
    };
  }
}
