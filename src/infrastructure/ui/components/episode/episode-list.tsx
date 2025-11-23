import Link from 'next/link';
import { Episode } from '@/domain/models/episode';
import { formatDate } from '@/infrastructure/ui/utils/date-utils';
import { formatDuration } from '@/infrastructure/ui/utils/time-utils';
import './episode-list.css';

interface EpisodeListProps {
  episodes: Episode[];
  podcastId: string;
}

export function EpisodeList({ episodes, podcastId }: EpisodeListProps) {
  return (
    <div className="episode-list">
      <div className="episode-list__header">
        <h2 className="episode-list__count">Episodes: {episodes.length}</h2>
      </div>
      <div className="episode-list__table-container">
        <table className="episode-list__table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.id} className="episode-list__row">
                <td className="episode-list__cell-title">
                  <Link href={`/podcast/${podcastId}/episode/${episode.id}`}>{episode.title}</Link>
                </td>
                <td>{formatDate(episode.date)}</td>
                <td>{formatDuration(episode.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
