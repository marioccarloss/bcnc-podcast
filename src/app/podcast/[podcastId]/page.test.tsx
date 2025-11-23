import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PodcastPage from './page';
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

vi.mock('@/infrastructure/ui/components/episode/episode-list', () => ({
  EpisodeList: ({ episodes, podcastId }: { episodes: Episode[]; podcastId: string }) => (
    <div data-testid="episode-list">
      {`Podcast ${podcastId} has ${episodes.length} episodes`}
    </div>
  ),
}));

describe('Podcast Detail Page', () => {
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

  it('should render episode list with correct data', async () => {
    mockExecute.mockResolvedValue({ podcast: mockPodcast, episodes: mockEpisodes });

    const params = Promise.resolve({ podcastId: '1' });
    const ui = await PodcastPage({ params });
    render(ui);

    expect(screen.getByTestId('episode-list').textContent).toContain('Podcast 1 has 1 episodes');
  });
});
