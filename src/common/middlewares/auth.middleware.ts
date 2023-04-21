import type { MiddlewareFn } from 'type-graphql';
import { JwtService } from '~/auth/services/jwt.service';
import { jwt } from '~/common/utils/env.config';
import { InternalServerException } from '../exceptions';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import type { BaseContext } from '../interfaces/base.interface';

export const checkAuth: MiddlewareFn<BaseContext> = async ({ context }, next) => {
  try {
    const authHeader = context.req.header('Authorization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException({
        message: 'Token invalid or missing bearer prefix',
      });
    }

    const jwtService = new JwtService(jwt);
    const decodedUser = await jwtService.verifyAccessToken(accessToken);
    if (!decodedUser)
      throw new UnauthorizedException({
        message: 'Your session has expired',
      });

    context.user = decodedUser;

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedException({
        message: 'Access token has expired',
      });
    } else if (error.name === 'JsonWebTokenError') {
      throw new UnauthorizedException({
        message: 'Invalid access token',
      });
    } else if (error.name === 'NotBeforeError') {
      throw new UnauthorizedException({
        message: 'Access token is not yet valid',
      });
    } else {
      throw new InternalServerException({
        message: error.message,
      });
    }
  }
};
