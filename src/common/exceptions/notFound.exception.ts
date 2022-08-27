import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
  constructor(error: { message: string }) {
    const { message } = error;
    super(404, message);
  }
}
