import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PodcastCard } from './podcast-card';
import { Podcast } from '@/domain/models/podcast';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('@/infrastructure/ui/context/navigation-context', () => ({
  useNavigation: () => ({
    startNavigation: vi.fn(),
  }),
}));

describe('PodcastCard', () => {
  const mockPodcast: Podcast = {
    id: '1',
    title: 'Test Podcast',
    author: 'Test Author',
    image: 'https://example.com/image.jpg',
    summary: 'Test Summary',
  };

  it('should render podcast title as a heading', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    
    const title = screen.getByRole('heading', { name: /TEST PODCAST/i });
    expect(title).toBeDefined();
  });

  it('should render podcast author', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    
    const author = screen.getByText(/Author: Test Author/i);
    expect(author).toBeDefined();
  });

  it('should render podcast image with correct alt text', () => {
    render(<PodcastCard podcast={mockPodcast} />);
    
    const image = screen.getByRole('img', { name: /Test Podcast/i });
    expect(image).toBeDefined();
    expect(image.getAttribute('src')).toContain('example.com/image.jpg');
  });
});
