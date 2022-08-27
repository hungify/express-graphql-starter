import express, { CookieOptions, NextFunction, Request, Response } from 'express';
import {
  BadRequestException,
  InternalServerException,
  NotFoundException,
} from '~/common/exceptions';
import { dayToSeconds } from '~/common/utils/date.util';
import { jwt } from '~/configs/env.config';
import { User } from '~/user/typedefs/user.type';
import { JwtService } from '../services/jwt.service';

const refreshTokenRoute = express();

refreshTokenRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      throw new BadRequestException({
        message: 'Refresh token is required',
      });

    const jwtService = new JwtService(jwt);
    const { email } = await jwtService.verifyRefreshToken(refreshToken);

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      throw new NotFoundException({
        message: 'Not found user',
      });
    }

    const newAccessToken = await jwtService.signInAccessToken(foundUser);
    const newRefreshToken = await jwtService.signInRefreshToken(foundUser);

    if (!newAccessToken || !newRefreshToken) {
      throw new InternalServerException({
        message: 'Error while generating tokens',
      });
    }

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: true,
      secure: false, // True in production
      maxAge: dayToSeconds(jwt.refreshTokenExpiresIn),
      path: '/refresh-token',
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    return res.status(200).json({
      accessToken: newAccessToken,
      message: 'success',
      statusCode: 200,
      status: true,
    });
  } catch (error) {
    next(error);
  }
});

export default refreshTokenRoute;
