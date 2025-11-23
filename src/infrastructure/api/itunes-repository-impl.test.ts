import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTopPodcasts, getPodcastDetails } from './itunes-repository-impl';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('itunes-repository-impl', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getTopPodcasts', () => {
    it('should call fetch with correct URL and cache configuration', async () => {
      const mockResponse = {
        feed: {
          entry: [],
        },
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await getTopPodcasts();

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/us/rss/toppodcasts/limit=100/genre=1310/json'),
        expect.objectContaining({
          next: { revalidate: 86400 },
        })
      );
    });
  });

  describe('getPodcastDetails', () => {
    it('should call fetch with correct URL and cache configuration', async () => {
      const mockResponse = {
        results: [
          {
            collectionId: 123,
            collectionName: 'Test Podcast',
            artistName: 'Test Artist',
            artworkUrl600: 'img',
          },
        ],
      };

      fetchMock.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      await getPodcastDetails('123');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/lookup?id=123'),
        expect.objectContaining({
          next: { revalidate: 86400 },
        })
      );
    });
  });
});
