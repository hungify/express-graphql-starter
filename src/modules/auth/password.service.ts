import argon2 from 'argon2';
import { envVariables } from '~/common/utils/env.util';

export const passwordService = {
  hash: (password: string) => {
    const { saltRounds } = envVariables;
    return argon2.hash(password, {
      salt: Buffer.alloc(Number(saltRounds)),
    });
  },
  verify: (password: string, hashedPassword: string) =>
    argon2.verify(hashedPassword, password),
};
