import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  constructor(error: { message: string }) {
    const { message } = error;
    super(401, message);
  }
}
