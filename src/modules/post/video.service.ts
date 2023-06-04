import { GraphQLError } from 'graphql';
import { CreateVideoInput } from './post.dto';
import { videoRepository } from './video.repository';
import { musicRepository } from './music.repository';
import { Music, Post, Video } from '@prisma/client';

class VideoService {
  async createVideo({ input }: CreateVideoInput) {
    const foundMusic = await musicRepository.getMusicById(input.musicId);
    if (!foundMusic) throw new GraphQLError('Music not found');

    return videoRepository.createVideo({
      ...input,
      postId: undefined,
      id: undefined,
    });
  }
  getVideoById(id: string) {
    return videoRepository.getVideoById(id);
  }
  updatePostId(id: string, post: Post) {
    return videoRepository.updatePostId(id, post);
  }
  updateMusicId(id: string, music: Music) {
    return videoRepository.updateMusicId(id, music);
  }
}

export const videoService = new VideoService();
