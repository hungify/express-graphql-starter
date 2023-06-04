import { AppContext } from '~/common/interfaces/base.interface';
import { Resolvers } from '~/generated/graphql';
import { userService } from '../user/user.service';
import { musicService } from './music.service';
import {
  CreateMusicInput,
  CreatePostInput,
  CreateVideoInput,
  IdInput,
  UpdatePostInput,
} from './post.dto';
import { postService } from './post.service';
import { videoService } from './video.service';

export const resolvers: Resolvers = {
  Query: {
    recommendedPosts: async (_, __, { user }: AppContext) => {
      const postResult = await postService.recommendedPosts(user.id);
      return postResult.map((post) => ({
        id: post.id,
        caption: post.caption,
        viewAs: post.viewAs,
        allow: post.allow,
        user: post.author,
        video: post.video,
        isLiked: false,
        isSaved: false,
        comments: post.comments,
        likes: post.likes,
        shares: post.shares,
      }));
    },
  },
  Mutation: {
    createMusic: async (_, data: CreateMusicInput) => {
      const musicResult = await musicService.createMusic(data);
      return musicResult;
    },
    createVideo: async (_, data: CreateVideoInput) => {
      const videoResult = await videoService.createVideo(data);
      return videoResult;
    },
    createPost: async (_, data: CreatePostInput, { user }: AppContext) => {
      const videoResult = await videoService.getVideoById(data.input.videoId);
      if (!videoResult) throw new Error('Video not found');

      const userResult = await userService.me(user.email);
      const postResult = await postService.createPost(data, userResult, videoResult);
      await videoService.updatePostId(videoResult.id, postResult);

      return {
        ...postResult,
        user: userResult,
        video: videoResult,
        comments: [],
        likes: [],
        shares: [],
        isLiked: false,
        isSaved: false,
      };
    },
    updatePost: async (_, data: UpdatePostInput, { user }: AppContext) => {
      const postResult = await postService.updatePost(data);
      if (!postResult) throw new Error('Post not found');
      const videoResult = await videoService.getVideoById(postResult.videoId);
      if (!videoResult) throw new Error('Video not found');

      const userResult = await userService.me(user.email);

      return {
        ...postResult,
        user: userResult,
        video: videoResult,
        comments: [],
        likes: [],
        shares: [],
        isLiked: false,
        isSaved: false,
      };
    },
    deletePost: async (_, { id }: IdInput) => {
      const postResult = await postService.deletePost(id);
      if (!postResult) throw new Error('Post not found');

      return true;
    },
    likePost: async (_, { id }: IdInput, { user }: AppContext) => {
      const userResult = await userService.me(user.email);
      const postResult = await postService.likePost(id, userResult);
      if (!postResult) throw new Error('Post not found');

      return true;
    },
  },
};
