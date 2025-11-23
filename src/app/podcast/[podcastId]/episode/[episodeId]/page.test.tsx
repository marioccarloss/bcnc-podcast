import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EpisodePage from './page';
import { Episode } from '@/domain/models/episode';
import { Podcast } from '@/domain/models/podcast';

const { mockExecute } = vi.hoisted(() => {
  return { mockExecute: vi.fn() };
});

vi.mock('@/application/use-cases/get-podcast-details-use-case', () => {
  return {
    GetPodcastDetailsUseCase: class {
      execute = mockExecute;
    },
  };
});

vi.mock('@/infrastructure/api/itunes-repository-impl', () => ({
  itunesRepository: {},
}));

vi.mock('@/infrastructure/ui/components/episode/episode-player', () => ({
  EpisodePlayer: ({ episode }: { episode: Episode }) => (
    <div data-testid="episode-player">
      {`Playing ${episode.title}`}
    </div>
  ),
}));

describe('Episode Detail Page', () => {
  const mockEpisodes: Episode[] = [
    {
      id: 'e1',
      title: 'Episode 1',
      description: 'desc1',
      duration: 100,
      date: '2023-01-01',
      audioUrl: 'url1',
    },
  ];

  const mockPodcast: Podcast = {
    id: '1',
    title: 'Podcast 1',
    author: 'Author 1',
    image: 'img1',
    summary: 'summary1',
  };

  it('should render episode player when episode is found', async () => {
    mockExecute.mockResolvedValue({ podcast: mockPodcast, episodes: mockEpisodes });

    const params = Promise.resolve({ podcastId: '1', episodeId: 'e1' });
    const ui = await EpisodePage({ params });
    render(ui);

    expect(screen.getByTestId('episode-player').textContent).toContain('Playing Episode 1');
  });

  it('should render not found message when episode is not found', async () => {
    mockExecute.mockResolvedValue({ podcast: mockPodcast, episodes: mockEpisodes });

    const params = Promise.resolve({ podcastId: '1', episodeId: 'e999' });
    const ui = await EpisodePage({ params });
    render(ui);

    expect(screen.getByText('Episodio no encontrado')).toBeDefined();
  });
});
