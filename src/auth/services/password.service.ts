import bcrypt from "bcryptjs";

export class PasswordService {
  constructor(private readonly saltOrRound: string| number) {}

  async hashed(password: string) {
    const hashedPassword = await bcrypt.hash(password, this.saltOrRound);
    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  }
}
