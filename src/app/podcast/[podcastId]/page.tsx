import { GetPodcastDetailsUseCase } from '@/application/use-cases/get-podcast-details-use-case';
import { itunesRepository } from '@/infrastructure/api/itunes-repository-impl';
import { EpisodeList } from '@/infrastructure/ui/components/episode/episode-list';

const getPodcastDetailsUseCase = new GetPodcastDetailsUseCase(itunesRepository);

export default async function PodcastPage({ params }: { params: Promise<{ podcastId: string }> }) {
  const { podcastId } = await params;
  const { episodes } = await getPodcastDetailsUseCase.execute(podcastId);

  return <EpisodeList episodes={episodes} podcastId={podcastId} />;
}
