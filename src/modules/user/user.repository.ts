import prisma from '~/common/utils/prisma.util';
import { RegisterInput } from '../auth/auth.dto';

export const userRepository = {
  create: (data: RegisterInput) => {
    return prisma.user.create({
      data,
    });
  },
  findUniqueByEmailOrId: (idOrEmail: string) => {
    return prisma.user.findFirst({
      where: {
        OR: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
  },
  findUniqueByEmail: (email: string) => {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  },
  findUniqueById: (id: string) => {
    return prisma.user.findFirst({
      where: {
        id,
      },
    });
  },
  getByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
  updateIsVerified: (email: string) => {
    return prisma.user.updateMany({
      where: {
        OR: [{ email: email }, { id: email }],
      },
      data: {
        isVerified: true,
      },
    });
  },
  updatePassword: (email: string, password: string) => {
    return prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  },
  updateEmail: (email: string, newEmail: string) => {
    return prisma.user.update({
      where: {
        email,
      },
      data: {
        email: newEmail,
      },
    });
  },
};
