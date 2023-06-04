import { musicRepository } from './music.repository';
import { CreateMusicInput } from './post.dto';

class MusicService {
  createMusic(data: CreateMusicInput) {
    return musicRepository.createMusic(data);
  }
  getMusicById(id: string) {
    return musicRepository.getMusicById(id);
  }
}

export const musicService = new MusicService();
