import { useEffect, useMemo, useRef, useState } from 'react';
import { Podcast } from '@/domain/models/podcast';
import { RESET_PODCAST_SEARCH_EVENT } from './use-reset-search';

export function usePodcastFilter(podcasts: Podcast[]) {
  const [filter, setFilter] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const handleReset = () => setFilter('');
    window.addEventListener(RESET_PODCAST_SEARCH_EVENT, handleReset);

    return () => {
      window.removeEventListener(RESET_PODCAST_SEARCH_EVENT, handleReset);
    };
  }, []);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const filteredPodcasts = useMemo(() => {
    if (!filter) return podcasts;
    const lowerFilter = filter.toLowerCase();
    return podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(lowerFilter) ||
        podcast.author.toLowerCase().includes(lowerFilter)
    );
  }, [podcasts, filter]);

  return {
    filter,
    setFilter,
    filteredPodcasts,
    searchInputRef,
  };
}
