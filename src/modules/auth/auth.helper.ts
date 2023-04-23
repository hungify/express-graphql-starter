import { CookieOptions, Response } from 'express';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import ms from 'ms';
import { TokenType, UserPayload } from './auth.interface';
import { User } from '@prisma/client';
import { emailService } from './email.service';
import { envVariables } from '~/common/utils/env.util';

const jwtSecret = (type: TokenType) => {
  const { accessTokenSecret, refreshTokenSecret } = envVariables;

  const secret = type === 'accessToken' ? accessTokenSecret : refreshTokenSecret;
  return secret;
};

const jwtExpiresIn = (type: TokenType) => {
  const { accessTokenExpiresIn, refreshTokenExpiresIn } = envVariables;

  const expiresIn = type === 'accessToken' ? accessTokenExpiresIn : refreshTokenExpiresIn;
  return expiresIn;
};

const signInToken = (payload: UserPayload | string, type: TokenType) => {
  const expiresIn = jwtExpiresIn(type);
  const secret = jwtSecret(type);

  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const authHelper = {
  sendVerifyEmail(email: string, token: string) {
    const { baseClientUrl } = envVariables;
    const verifyUrl = `${baseClientUrl}/auth/verify?token=${token}&email=${email}`;

    return emailService.sendEmail({
      verifyUrl,
      email,
      subject: 'Verify your email',
      type: 'register',
    });
  },
  getUserFromPayload(user: User): UserPayload {
    return {
      email: user.email,
      isVerified: user.isVerified,
      role: user.role,
      id: user.id,
    };
  },

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
        signInToken(payload, 'accessToken'),
        signInToken(payload, 'refreshToken'),
      ]);
      res.cookie('refreshToken', refreshToken, cookieOptions);

      return accessToken;
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError(error.message);
      }
    }
  },
  verifyToken(token: string, type: TokenType) {
    try {
      const secret = jwtSecret(type);
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
  },
};
