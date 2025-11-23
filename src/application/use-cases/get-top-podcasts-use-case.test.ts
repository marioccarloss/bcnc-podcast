import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetTopPodcastsUseCase } from './get-top-podcasts-use-case';
import { PodcastRepository } from '@/domain/repositories/podcast-repository';
import { Podcast } from '@/domain/models/podcast';

describe('GetTopPodcastsUseCase', () => {
  let useCase: GetTopPodcastsUseCase;
  let repositoryMock: PodcastRepository;

  const mockPodcasts: Podcast[] = [
    {
      id: '1',
      title: 'Podcast 1',
      author: 'Author 1',
      summary: 'Desc 1',
      image: 'img1',
    },
  ];

  beforeEach(() => {
    repositoryMock = {
      getTopPodcasts: vi.fn(),
      getPodcastDetails: vi.fn(),
    };
    useCase = new GetTopPodcastsUseCase(repositoryMock);
  });

  it('should return top podcasts from repository', async () => {
    vi.mocked(repositoryMock.getTopPodcasts).mockResolvedValue({ podcasts: mockPodcasts });

    const result = await useCase.execute();

    expect(repositoryMock.getTopPodcasts).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ podcasts: mockPodcasts });
  });

  it('should propagate errors from repository', async () => {
    const error = new Error('Repository error');
    vi.mocked(repositoryMock.getTopPodcasts).mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toThrow(error);
  });
});
