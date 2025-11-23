'use client';

import { Episode } from '@/domain/models/episode';
import { useEpisodePlayer } from '@/infrastructure/ui/hooks/use-episode-player';
import './episode-player.css';

interface EpisodePlayerProps {
  episode: Episode;
}

export function EpisodePlayer({ episode }: EpisodePlayerProps) {
  const { audioRef } = useEpisodePlayer(episode);

  return (
    <div className="episode-player">
      <h2 className="episode-player__title">{episode.title}</h2>
      <div
        className="episode-player__description"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
      <div className="episode-player__audio-container">
        <audio controls className="episode-player__audio" ref={audioRef}>
          <source src={episode.audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}
