import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetPodcastDetailsUseCase } from './get-podcast-details-use-case';
import { PodcastRepository } from '@/domain/repositories/podcast-repository';
import { Podcast } from '@/domain/models/podcast';
import { Episode } from '@/domain/models/episode';

describe('GetPodcastDetailsUseCase', () => {
  let useCase: GetPodcastDetailsUseCase;
  let repositoryMock: PodcastRepository;

  const mockPodcast: Podcast = {
    id: '1',
    title: 'Podcast 1',
    author: 'Author 1',
    summary: 'Desc 1',
    image: 'img1',
  };

  const mockEpisodes: Episode[] = [
    {
      id: 'e1',
      title: 'Episode 1',
      description: 'Desc 1',
      duration: 100,
      date: '2023-01-01',
      audioUrl: 'url1',
    },
  ];

  beforeEach(() => {
    repositoryMock = {
      getTopPodcasts: vi.fn(),
      getPodcastDetails: vi.fn(),
    };
    useCase = new GetPodcastDetailsUseCase(repositoryMock);
  });

  it('should return podcast details from repository', async () => {
    const mockResult = { podcast: mockPodcast, episodes: mockEpisodes };
    vi.mocked(repositoryMock.getPodcastDetails).mockResolvedValue(mockResult);

    const result = await useCase.execute('1');

    expect(repositoryMock.getPodcastDetails).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockResult);
  });

  it('should propagate errors from repository', async () => {
    const error = new Error('Repository error');
    vi.mocked(repositoryMock.getPodcastDetails).mockRejectedValue(error);

    await expect(useCase.execute('1')).rejects.toThrow(error);
  });
});
