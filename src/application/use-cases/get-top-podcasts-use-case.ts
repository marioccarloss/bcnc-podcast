import { PodcastRepository } from '@/domain/repositories/podcast-repository';
import { Podcast } from '@/domain/models/podcast';

export class GetTopPodcastsUseCase {
  constructor(private readonly repository: PodcastRepository) {}

  async execute(): Promise<{ podcasts: Podcast[] }> {
    return this.repository.getTopPodcasts();
  }
}
