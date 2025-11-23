import { GetPodcastDetailsUseCase } from '@/application/use-cases/get-podcast-details-use-case';
import { itunesRepository } from '@/infrastructure/api/itunes-repository-impl';
import { EpisodePlayer } from '@/infrastructure/ui/components/episode/episode-player';

const getPodcastDetailsUseCase = new GetPodcastDetailsUseCase(itunesRepository);

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ podcastId: string; episodeId: string }>;
}) {
  const { podcastId, episodeId } = await params;
  const { episodes } = await getPodcastDetailsUseCase.execute(podcastId);

  const episode = episodes.find((ep) => ep.id === episodeId);

  if (!episode) {
    return <div>Episodio no encontrado</div>;
  }

  return <EpisodePlayer episode={episode} />;
}
