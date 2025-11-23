import { Podcast } from '../models/podcast';
import { Episode } from '../models/episode';

export interface PodcastRepository {
  getTopPodcasts(): Promise<{ podcasts: Podcast[] }>;
  getPodcastDetails(id: string): Promise<{ podcast: Podcast; episodes: Episode[] }>;
}
