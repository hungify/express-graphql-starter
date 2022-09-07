import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(error: { message: string }) {
    const { message } = error;
    super(400, message);
  }
}
