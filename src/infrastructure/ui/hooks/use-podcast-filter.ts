import { useState, useMemo } from 'react';
import { Podcast } from '@/domain/models/podcast';

export function usePodcastFilter(podcasts: Podcast[]) {
  const [filter, setFilter] = useState('');

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
  };
}
