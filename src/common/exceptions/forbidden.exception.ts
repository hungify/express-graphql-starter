import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
  constructor(error: { message: string }) {
    const { message } = error;
    super(403, message);
  }
}