import Link from 'next/link';
import { Episode } from '@/domain/models/episode';
import { formatDate } from '@/infrastructure/ui/utils/date-utils';
import { formatDuration } from '@/infrastructure/ui/utils/time-utils';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Text,
} from '@/infrastructure/ui/components/primitives';
import './episode-list.css';

interface EpisodeListProps {
  episodes: Episode[];
  podcastId: string;
}

export function EpisodeList({ episodes, podcastId }: EpisodeListProps) {
  return (
    <div className="episode-list">
      <div className="episode-list__header">
        <Text as="h2" variant="heading" className="episode-list__count">
          Episodes: {episodes.length}
        </Text>
      </div>
      <Table className="episode-list__table">
        <TableHead>
          <TableRow>
            <TableHeader>Title</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Duration</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes.map((episode) => (
            <TableRow key={episode.id} className="episode-list__row">
              <TableCell className="episode-list__cell-title">
                <Link href={`/podcast/${podcastId}/episode/${episode.id}`}>{episode.title}</Link>
              </TableCell>
              <TableCell>{formatDate(episode.date)}</TableCell>
              <TableCell>{formatDuration(episode.duration)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
