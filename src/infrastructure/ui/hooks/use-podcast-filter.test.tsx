import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePodcastFilter } from './index';
import { Podcast } from '@/domain/models/podcast';
import { RESET_PODCAST_SEARCH_EVENT } from './use-reset-search';

describe('usePodcastFilter', () => {
  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'React Podcast',
      author: 'Facebook',
      image: 'image1.jpg',
      summary: 'A podcast about React',
    },
    {
      id: '2',
      title: 'Vue Podcast',
      author: 'Evan You',
      image: 'image2.jpg',
      summary: 'A podcast about Vue',
    },
    {
      id: '3',
      title: 'Angular Podcast',
      author: 'Google',
      image: 'image3.jpg',
      summary: 'A podcast about Angular',
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

  it('should reset filter when the reset event is dispatched', () => {
    const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

    act(() => {
      result.current.setFilter('React');
    });

    act(() => {
      window.dispatchEvent(new Event(RESET_PODCAST_SEARCH_EVENT));
    });

    expect(result.current.filter).toBe('');
    expect(result.current.filteredPodcasts).toEqual(mockPodcasts);
  });
});
