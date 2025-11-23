import { GetTopPodcastsUseCase } from '@/application/use-cases/get-top-podcasts-use-case';
import { PodcastListView } from '@/infrastructure/ui/components/podcast/podcast-list-view';
import { itunesRepository } from '@/infrastructure/api/itunes-repository-impl';

const getTopPodcastsUseCase = new GetTopPodcastsUseCase(itunesRepository);

export default async function Home() {
  const { podcasts } = await getTopPodcastsUseCase.execute();

  return (
    <main>
      <PodcastListView podcasts={podcasts} />
    </main>
  );
}
