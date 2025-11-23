import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './page';
import { Podcast } from '@/domain/models/podcast';

const { mockExecute } = vi.hoisted(() => {
  return { mockExecute: vi.fn() };
});

vi.mock('@/application/use-cases/get-top-podcasts-use-case', () => {
  return {
    GetTopPodcastsUseCase: class {
      execute = mockExecute;
    },
  };
});

vi.mock('@/infrastructure/api/itunes-repository-impl', () => ({
  itunesRepository: {},
}));
vi.mock('@/infrastructure/ui/components/podcast/podcast-list-view', () => ({
  PodcastListView: ({ podcasts }: { podcasts: Podcast[] }) => (
    <div data-testid="podcast-list">
      {podcasts.length === 0 ? 'No podcasts' : `Found ${podcasts.length} podcasts`}
    </div>
  ),
}));

describe('Home Page', () => {
  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'Podcast 1',
      author: 'Author 1',
      image: 'img1',
      summary: 'summary1',
    },
    {
      id: '2',
      title: 'Podcast 2',
      author: 'Author 2',
      image: 'img2',
      summary: 'summary2',
    },
  ];

  it('should render list of podcasts when use case returns data', async () => {
    mockExecute.mockResolvedValue({ podcasts: mockPodcasts });

    const ui = await Home();
    render(ui);

    expect(screen.getByTestId('podcast-list').textContent).toContain('Found 2 podcasts');
  });

  it('should render empty state when use case returns no podcasts', async () => {
    mockExecute.mockResolvedValue({ podcasts: [] });

    const ui = await Home();
    render(ui);

    expect(screen.getByTestId('podcast-list').textContent).toContain('No podcasts');
  });
});
