import { useRef, useEffect, RefObject } from 'react';
import { Episode } from '@/domain/models/episode';

interface UseEpisodePlayerResult {
  audioRef: RefObject<HTMLAudioElement | null>;
}

export function useEpisodePlayer(episode: Episode): UseEpisodePlayerResult {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [episode]);

  return {
    audioRef,
  };
}
