import { GetPodcastDetailsUseCase } from '@/application/use-cases/get-podcast-details-use-case';
import { GetTopPodcastsUseCase } from '@/application/use-cases/get-top-podcasts-use-case';
import { itunesRepository } from '@/infrastructure/api/itunes-repository-impl';
import { PodcastDetailSidebar } from '@/infrastructure/ui/components/podcast/podcast-detail-sidebar';
import './layout.css';

const getPodcastDetailsUseCase = new GetPodcastDetailsUseCase(itunesRepository);
const getTopPodcastsUseCase = new GetTopPodcastsUseCase(itunesRepository);

export default async function PodcastLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ podcastId: string }>;
}) {
  const { podcastId } = await params;
  
  const { podcast } = await getPodcastDetailsUseCase.execute(podcastId);
  
  const { podcasts } = await getTopPodcastsUseCase.execute();
  
  const podcastWithSummary = podcasts.find(p => p.id === podcastId);
  
  const completePodcast = {
    ...podcast,
    summary: podcastWithSummary?.summary || podcast.summary || '',
  };

  return (
    <div className="podcast-layout">
      <PodcastDetailSidebar podcast={completePodcast} />
      <div className="podcast-layout__content">{children}</div>
    </div>
  );
}
