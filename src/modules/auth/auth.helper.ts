import { CookieOptions, Response } from 'express';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { EnvVariables, envVariables } from '~/common/utils/env.util';
import { userRepository } from '../user/user.repository';
import { AuthJwtPayload, TokenType, UserPayload } from './auth.interface';
import { emailService } from './email.service';

class AuthHelper {
  private jwtSecret(type: TokenType): EnvVariables[`${TokenType}Secret`] {
    return envVariables[`${type}Secret`];
  }

  private jwtExpiresIn(type: TokenType): EnvVariables[`${TokenType}ExpiresIn`] {
    return envVariables[`${type}ExpiresIn`];
  }

  signInToken(payload: AuthJwtPayload, type: TokenType) {
    const expiresIn = this.jwtExpiresIn(type);
    const secret = this.jwtSecret(type);
    return jwt.sign(payload, secret, {
      expiresIn: ms(expiresIn),
    });
  }

  async getUserFromToken(token: string): Promise<UserPayload | null> {
    if (!token) return null;
    const payload = this.verifyToken(token, 'accessToken');
    const user = await userRepository.findUniqueByEmail(payload.email);
    return user;
  }

  async signInTokenAndSetCookie(payload: UserPayload, res: Response) {
    const { nodeEnv, refreshTokenExpiresIn } = envVariables;

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: nodeEnv === 'production',
      maxAge: ms(refreshTokenExpiresIn),
      path: '/',
    };

    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.signInToken(payload, 'accessToken'),
        this.signInToken(payload, 'refreshToken'),
      ]);
      res.cookie('refreshToken', refreshToken, cookieOptions);

      return accessToken;
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message);
      }
    }
  }
  verifyToken(token: string, type: TokenType) {
    try {
      const secret = this.jwtSecret(type);
      const payload = jwt.verify(token, secret) as UserPayload;
      return payload;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') throw new GraphQLError('Token expired');
        else if (error.name === 'JsonWebTokenError')
          throw new GraphQLError('Invalid token');
        else throw new GraphQLError(error.message);
      }
    }
  }
  sendVerifyEmail(email: string, token: string) {
    const { baseClientUrl } = envVariables;
    const verifyUrl = `${baseClientUrl}/auth/verify?token=${token}`;

    return emailService.sendEmail({
      verifyUrl,
      email,
      subject: 'Verify your email',
      type: 'register',
    });
  }
}

export const authHelper = new AuthHelper();
