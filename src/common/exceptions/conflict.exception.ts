import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  constructor(error: { message: string }) {
    const { message } = error;
    super(409, message);
  }
}
