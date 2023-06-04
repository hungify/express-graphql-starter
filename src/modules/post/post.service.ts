import { User, Video } from '@prisma/client';
import { CreatePostInput, UpdatePostInput } from './post.dto';
import { postRepository } from './post.repository';

class PostService {
  recommendedPosts(userId: string) {
    return postRepository.posts(userId);
  }
  createPost(data: CreatePostInput, user: User, video: Video) {
    return postRepository.createPost(data, user, video);
  }
  updatePost(data: UpdatePostInput) {
    return postRepository.updatePost(data);
  }
  deletePost(id: string) {
    return postRepository.deletePost(id);
  }
  likePost(id: string, user: User) {
    return postRepository.likePost(id, user);
  }
}

export const postService = new PostService();
