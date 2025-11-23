'use client';

import { Podcast } from '@/domain/models/podcast';
import { usePodcastFilter } from '@/infrastructure/ui/hooks/use-podcast-filter';
import { PodcastCard } from './podcast-card';
import { SearchFilter } from './search-filter';
import './podcast-list-view.css';

interface PodcastListViewProps {
  podcasts: Podcast[];
}

export function PodcastListView({ podcasts }: PodcastListViewProps) {
  const { filter, setFilter, filteredPodcasts } = usePodcastFilter(podcasts);

  return (
    <div className="podcast-list-view">
      <SearchFilter
        count={filteredPodcasts.length}
        filterValue={filter}
        onFilterChange={setFilter}
      />
      {filteredPodcasts.length > 0 ? (
        <div className="podcast-list-view__grid">
          {filteredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      ) : (
        <div className="podcast-list-view__empty">No se encontraron podcasts</div>
      )}
    </div>
  );
}
