import { renderHook, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useEpisodePlayer } from './use-episode-player';
import { Episode } from '@/domain/models/episode';

describe('useEpisodePlayer', () => {
  const mockEpisode: Episode = {
    id: '1',
    title: 'Test Episode',
    description: 'Test Description',
    audioUrl: 'http://example.com/audio.mp3',
    duration: 1000,
    date: '2024-01-01',
  };

  it('should return an audioRef', () => {
    const { result } = renderHook(() => useEpisodePlayer(mockEpisode));
    expect(result.current.audioRef).toBeDefined();
  });

  it('should call load on mount/update and pause on unmount', () => {
    const loadSpy = vi.fn();
    const pauseSpy = vi.fn();

    const mockAudioElement = document.createElement('audio');
    mockAudioElement.load = loadSpy;
    mockAudioElement.pause = pauseSpy;

    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(loadSpy);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(pauseSpy);

    const TestComponent = ({ episode }: { episode: Episode }) => {
      const { audioRef } = useEpisodePlayer(episode);
      return <audio ref={audioRef} src={episode.audioUrl} />;
    };

    const { unmount, rerender } = render(<TestComponent episode={mockEpisode} />);

    expect(loadSpy).toHaveBeenCalled();

    const newEpisode = { ...mockEpisode, id: '2' };
    rerender(<TestComponent episode={newEpisode} />);

    expect(pauseSpy).toHaveBeenCalled();
    expect(pauseSpy).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalledTimes(2);

    unmount();
    expect(pauseSpy).toHaveBeenCalledTimes(2);
  });
});
