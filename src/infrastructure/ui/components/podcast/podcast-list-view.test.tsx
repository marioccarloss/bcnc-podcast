import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PodcastListView } from './podcast-list-view';
import { Podcast } from '@/domain/models/podcast';

vi.mock('./podcast-card', () => ({
  PodcastCard: ({ podcast }: { podcast: Podcast }) => (
    <div data-testid="podcast-card">{podcast.title}</div>
  ),
}));

vi.mock('./search-filter', () => ({
  SearchFilter: ({ count, filterValue, onFilterChange }: any) => (
    <div data-testid="search-filter">
      <span>Count: {count}</span>
      <input
        data-testid="filter-input"
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
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

    const input = screen.getByTestId('filter-input');
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

    const input = screen.getByTestId('filter-input');
    fireEvent.change(input, { target: { value: 'Angular' } });

    expect(screen.getByText('No se encontraron podcasts')).toBeDefined();
    expect(screen.queryByTestId('podcast-card')).toBeNull();
  });
});
