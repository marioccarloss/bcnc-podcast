import { PodcastRepository } from '@/domain/repositories/podcast-repository';
import { Podcast } from '@/domain/models/podcast';
import { Episode } from '@/domain/models/episode';

export class GetPodcastDetailsUseCase {
  constructor(private readonly repository: PodcastRepository) {}

  async execute(id: string): Promise<{ podcast: Podcast; episodes: Episode[] }> {
    return this.repository.getPodcastDetails(id);
  }
}
