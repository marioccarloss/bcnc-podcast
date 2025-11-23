import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePodcastFilter } from './use-podcast-filter';
import { Podcast } from '@/domain/models/podcast';

describe('usePodcastFilter', () => {
  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'React Podcast',
      author: 'Facebook',
      description: 'A podcast about React',
      image: 'image1.jpg',
    },
    {
      id: '2',
      title: 'Vue Podcast',
      author: 'Evan You',
      description: 'A podcast about Vue',
      image: 'image2.jpg',
    },
    {
      id: '3',
      title: 'Angular Podcast',
      author: 'Google',
      description: 'A podcast about Angular',
      image: 'image3.jpg',
    },
  ];

  it('should return all podcasts initially', () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));
    expect(result.current.filteredPodcasts).toEqual(mockPodcasts);
    expect(result.current.filter).toBe('');
  });

  it('should filter podcasts by title', () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setFilter('React');
    });

    expect(result.current.filteredPodcasts).toHaveLength(1);
    expect(result.current.filteredPodcasts[0].title).toBe('React Podcast');
  });

  it('should filter podcasts by author', () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setFilter('Evan');
    });

    expect(result.current.filteredPodcasts).toHaveLength(1);
    expect(result.current.filteredPodcasts[0].author).toBe('Evan You');
  });

  it('should be case insensitive', () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setFilter('react');
    });

    expect(result.current.filteredPodcasts).toHaveLength(1);
    expect(result.current.filteredPodcasts[0].title).toBe('React Podcast');
  });

  it('should return empty array if no match', () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setFilter('Svelte');
    });

    expect(result.current.filteredPodcasts).toHaveLength(0);
  });
});
