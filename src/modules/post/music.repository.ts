import prisma from '~/common/utils/prisma.util';
import { CreateMusicInput } from './post.dto';

class MusicRepository {
  createMusic({ input }: CreateMusicInput) {
    return prisma.music.create({
      data: input,
    });
  }
  getMusicById(id: string) {
    return prisma.music.findUnique({
      where: { id },
    });
  }
}

export const musicRepository = new MusicRepository();
