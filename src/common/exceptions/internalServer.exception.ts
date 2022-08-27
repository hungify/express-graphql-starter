import { HttpException } from './http.exception';

export class InternalServerException extends HttpException {
  constructor(error: { message: string }) {
    const { message } = error;
    super(500, message);
  }
}
