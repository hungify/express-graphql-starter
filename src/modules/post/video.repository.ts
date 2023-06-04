import { Music, Post, Video } from '@prisma/client';
import prisma from '~/common/utils/prisma.util';

class VideoRepository {
  createVideo(video: Video) {
    return prisma.video.create({
      data: {
        ...video,
      },
      include: {
        music: true,
      },
    });
  }
  getVideoById(id: string) {
    return prisma.video.findUnique({
      where: {
        id,
      },
      include: {
        music: true,
      },
    });
  }
  updatePostId(id: string, post: Post) {
    return prisma.video.update({
      where: {
        id,
      },
      data: {
        post: {
          connect: {
            id: post.id,
          },
        },
      },
      include: { post: true },
    });
  }
  updateMusicId(id: string, music: Music) {
    return prisma.video.update({
      where: {
        id,
      },
      data: {
        music: {
          connect: {
            id: music.id,
          },
        },
      },
      include: { music: true },
    });
  }
}

export const videoRepository = new VideoRepository();
