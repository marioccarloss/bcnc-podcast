import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PodcastListView } from './podcast-list-view';
import { Podcast } from '@/domain/models/podcast';
import { RESET_PODCAST_SEARCH_EVENT } from '@/infrastructure/ui/hooks/use-reset-search';

vi.mock('./podcast-card', () => ({
  PodcastCard: ({ podcast }: { podcast: Podcast }) => (
    <div data-testid="podcast-card">{podcast.title}</div>
  ),
}));

describe('PodcastListView', () => {
  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'React Podcast',
      author: 'Facebook',
      image: 'img1',
      summary: 'summary1',
    },
    {
      id: '2',
      title: 'Vue Podcast',
      author: 'Evan You',
      image: 'img2',
      summary: 'summary2',
    },
  ];

  it('should render list of podcasts', () => {
    render(<PodcastListView podcasts={mockPodcasts} />);

    expect(screen.getAllByTestId('podcast-card')).toHaveLength(2);
    expect(screen.getByText('React Podcast')).toBeDefined();
    expect(screen.getByText('Vue Podcast')).toBeDefined();
  });

  it('should filter podcasts', () => {
    render(<PodcastListView podcasts={mockPodcasts} />);

    const input = screen.getByPlaceholderText('Filter podcasts...');
    fireEvent.change(input, { target: { value: 'React' } });

    expect(screen.getAllByTestId('podcast-card')).toHaveLength(1);
    expect(screen.getByText('React Podcast')).toBeDefined();
    expect(screen.queryByText('Vue Podcast')).toBeNull();
  });

  it('should render "No se encontraron podcasts" message when list is empty', () => {
    render(<PodcastListView podcasts={[]} />);

    expect(screen.getByText('No se encontraron podcasts')).toBeDefined();
    expect(screen.queryByTestId('podcast-card')).toBeNull();
  });

  it('should render "No se encontraron podcasts" message when filter returns no results', () => {
    render(<PodcastListView podcasts={mockPodcasts} />);

    const input = screen.getByPlaceholderText('Filter podcasts...');
    fireEvent.change(input, { target: { value: 'Angular' } });

    expect(screen.getByText('No se encontraron podcasts')).toBeDefined();
    expect(screen.queryByTestId('podcast-card')).toBeNull();
  });

  it('should focus the search input on mount', async () => {
    render(<PodcastListView podcasts={mockPodcasts} />);

    const input = screen.getByPlaceholderText('Filter podcasts...');

    await waitFor(() => expect(document.activeElement).toBe(input));
  });

  it('should reset filter when the global reset event is dispatched', () => {
    render(<PodcastListView podcasts={mockPodcasts} />);

    const input = screen.getByPlaceholderText('Filter podcasts...');

    fireEvent.change(input, { target: { value: 'React' } });
    expect(input).toHaveValue('React');
    expect(screen.getAllByTestId('podcast-card')).toHaveLength(1);

    act(() => {
      window.dispatchEvent(new Event(RESET_PODCAST_SEARCH_EVENT));
    });

    expect(input).toHaveValue('');
    expect(screen.getAllByTestId('podcast-card')).toHaveLength(2);
  });
});
