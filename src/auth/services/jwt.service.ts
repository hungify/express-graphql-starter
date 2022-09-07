import JWT from 'jsonwebtoken';
import { InternalServerException, UnauthorizedException } from '~/common/exceptions';
import type {
  JwtPayloadContext,
  UserJwtPayload,
} from '~/common/interfaces/base.interface';
import type { JwtConfig } from '~/common/interfaces/config.interface';
import type { User } from '~/user/typedefs/user.type';

export class JwtService {
  constructor(private readonly jwt: JwtConfig) {}

  async signInAccessToken({ email }: User) {
    const payload: UserJwtPayload = { email };
    const secret = this.jwt.accessTokenSecret;
    const expiresIn = this.jwt.accessTokenExpiresIn;
    const options = {
      expiresIn,
    };
    const accessToken = await JWT.sign(payload, secret, options);
    return accessToken;
  }

  async signInRefreshToken({ email }: User) {
    const payload: UserJwtPayload = { email };
    const secret = this.jwt.refreshTokenSecret;
    const expiresIn = this.jwt.refreshTokenExpiresIn;
    const options = {
      expiresIn,
    };
    const refreshToken = await JWT.sign(payload, secret, options);
    return refreshToken;
  }

  async verifyRefreshToken(token: string): Promise<JwtPayloadContext> {
    try {
      const secret = this.jwt.refreshTokenSecret;
      const payload = (await JWT.verify(token, secret)) as JwtPayloadContext;
      return payload;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException({
          message: 'Refresh token has expired',
        });
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException({
          message: 'Invalid access token',
        });
      } else {
        throw new InternalServerException({
          message: err.message,
        });
      }
    }
  }

  async verifyAccessToken(token: string): Promise<JwtPayloadContext> {
    try {
      const secret = this.jwt.accessTokenSecret;
      const payload = (await JWT.verify(token, secret)) as JwtPayloadContext;
      return payload;
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException({
          message: 'Access token has expired',
        });
      } else if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException({
          message: 'Invalid access token',
        });
      } else {
        throw new InternalServerException({
          message: err.message,
        });
      }
    }
  }
}
