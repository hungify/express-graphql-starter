import { Post, User, Video } from '@prisma/client';
import prisma from '~/common/utils/prisma.util';
import { CreatePostInput, UpdatePostInput } from './post.dto';

class PostRepository {
  posts(_userId: String) {
    return prisma.post.findMany({
      include: {
        comments: {
          include: {
            author: true,
          },
        },
        likes: {
          include: {
            author: true,
          },
        },
        shares: {
          include: {
            author: true,
          },
        },
        video: {
          include: {
            music: true,
          },
        },
        author: true,
      },
    });
  }
  createPost({ input }: CreatePostInput, user: User, video: Video) {
    return prisma.post.create({
      data: {
        caption: input.caption,
        viewAs: input.viewAs,
        allow: {
          set: input.allow,
        },
        authorId: user.id,
        videoId: video.id,
      },
    });
  }
  updatePost({ input, id }: UpdatePostInput) {
    return prisma.post.update({
      where: {
        id,
      },
      data: {
        caption: input.caption,
        viewAs: input.viewAs,
        allow: {
          set: input.allow,
        },
      },
    });
  }
  deletePost(id: string) {
    return prisma.post.delete({
      where: {
        id,
      },
    });
  }
  likePost(id: string, user: User) {
    return prisma.post.update({
      where: {
        id,
      },
      data: {
        likes: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }
}

export const postRepository = new PostRepository();
