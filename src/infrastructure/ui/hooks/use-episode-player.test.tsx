import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useEpisodePlayer } from './use-episode-player';
import { Episode } from '@/domain/models/episode';

describe('useEpisodePlayer', () => {
  const mockEpisode: Episode = {
    id: '1',
    title: 'Test Episode',
    description: 'Test Description',
    audioUrl: 'http://example.com/audio.mp3',
    duration: 1000,
    releaseDate: new Date(),
  };

  let audioMock: HTMLAudioElement;

  beforeEach(() => {
    // Mock HTMLAudioElement
    audioMock = {
      load: vi.fn(),
      pause: vi.fn(),
    } as unknown as HTMLAudioElement;

    // Mock useRef to return our audioMock
    // Since we can't easily mock useRef directly inside the component without mocking React,
    // we rely on the fact that the hook uses a ref.
    // However, in JSDOM, creating an audio element via new Audio() or document.createElement('audio') works.
    // The hook initializes the ref as null. We need to simulate the ref being attached.
    // But `useEpisodePlayer` creates the ref. We can't inject it.
    // Actually, the hook returns the ref. We can set the current value of the returned ref in the test?
    // No, the useEffect runs on mount/update.
    
    // Better approach: The hook is designed to attach the ref to an <audio> element.
    // We can render a component that uses the hook and the ref.
  });

  it('should return an audioRef', () => {
    const { result } = renderHook(() => useEpisodePlayer(mockEpisode));
    expect(result.current.audioRef).toBeDefined();
  });

  // Testing the useEffect logic (load/pause) is tricky with just renderHook because the ref.current is null initially.
  // We need to simulate the ref being attached to an element.
  // We can use a wrapper component.
  
  it('should call load on mount/update and pause on unmount', () => {
    const loadSpy = vi.fn();
    const pauseSpy = vi.fn();

    // Mock the audio element behavior
    const mockAudioElement = document.createElement('audio');
    mockAudioElement.load = loadSpy;
    mockAudioElement.pause = pauseSpy;

    // We need to manually set the ref.current to trigger the effect logic?
    // The effect runs when `episode` changes.
    // Inside the effect: `const audio = audioRef.current; if (audio) { audio.load(); }`
    
    // If we use renderHook, the ref is created. But .current is null.
    // We can mutate the ref.current after render, but the effect has already run.
    // We need to rerender to trigger effect again? No, effect depends on [episode].
    
    // Let's try to mock React.useRef? No, that's messy.
    
    // Let's just test that it returns the ref. The logic inside useEffect depends on the ref being set, which happens in the UI.
    // Ideally we would render a component:
    // function TestComponent({ episode }) {
    //   const { audioRef } = useEpisodePlayer(episode);
    //   return <audio ref={audioRef} />;
    // }
    
    // But JSDOM audio element might not have load/pause methods mocked by default?
    // JSDOM does not implement layout/rendering, but it has basic DOM.
    // HTMLMediaElement.prototype.load is not implemented in JSDOM usually.
    
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(loadSpy);
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(pauseSpy);

    // We need a component to attach the ref
    // eslint-disable-next-line react/display-name
    const TestComponent = ({ episode }: { episode: Episode }) => {
        const { audioRef } = useEpisodePlayer(episode);
        return <audio ref={audioRef} src={episode.audioUrl} />;
    };

    // We need to use @testing-library/react's render
    const { unmount, rerender } =  require('@testing-library/react').render(<TestComponent episode={mockEpisode} />);
    
    // On mount, the ref is attached, and the effect runs.
    // However, React refs are set before effects run.
    expect(loadSpy).toHaveBeenCalled();

    // Update episode
    const newEpisode = { ...mockEpisode, id: '2' };
    rerender(<TestComponent episode={newEpisode} />);
    
    // Cleanup of previous effect (pause) should run?
    // The effect return function: `if (audio) audio.pause()`
    // Yes, it should run.
    expect(pauseSpy).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalledTimes(2);

    unmount();
    expect(pauseSpy).toHaveBeenCalledTimes(2);
  });
});
