'use cache';

import { PodcastRepository } from '@/domain/repositories/podcast-repository';
import { Podcast } from '@/domain/models/podcast';
import { Episode } from '@/domain/models/episode';
import { TopPodcastsResponse, PodcastDetailsResponse } from './dtos/itunes-dtos';

const BASE_URL = process.env.ITUNES_API_URL;

export async function getTopPodcasts(): Promise<{ podcasts: Podcast[] }> {
  const response = await fetch(`${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error('No se han podido recuperar los podcasts más populares.');
  }

  const data: TopPodcastsResponse = await response.json();

  const podcasts = data.feed.entry.map((entry) => ({
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    author: entry['im:artist'].label,
    image: entry['im:image'][2].label,
    summary: entry.summary ? entry.summary.label : '',
  }));

  return { podcasts };
}

export async function getPodcastDetails(
  id: string
): Promise<{ podcast: Podcast; episodes: Episode[] }> {
  const response = await fetch(
    `${BASE_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`,
    { next: { revalidate: 86400 } }
  );

  if (!response.ok) {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `${BASE_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
    )}`;
    const proxyResponse = await fetch(proxyUrl, { next: { revalidate: 86400 } });
    if (!proxyResponse.ok) throw new Error('No se pudieron obtener los detalles del podcast');
    const proxyData = await proxyResponse.json();
    const data: PodcastDetailsResponse = JSON.parse(proxyData.contents);
    return mapPodcastDetails(data);
  }

  const data: PodcastDetailsResponse = await response.json();

  return mapPodcastDetails(data);
}

function mapPodcastDetails(data: PodcastDetailsResponse): {
  podcast: Podcast;
  episodes: Episode[];
} {
  const results = data.results;

  if (!results || results.length === 0) {
    throw new Error('No se han encontrado resultados');
  }

  const podcastData = results[0];
  const episodesData = results.slice(1);

  const podcast: Podcast = {
    id: podcastData.collectionId?.toString() || '',
    title: podcastData.collectionName || '',
    author: podcastData.artistName || '',
    image: podcastData.artworkUrl600 || podcastData.artworkUrl100 || '',
    summary: '',
  };

  const episodes: Episode[] = episodesData.map((ep) => ({
    id: ep.trackId?.toString() || '',
    title: ep.trackName || '',
    date: ep.releaseDate || '',
    duration: ep.trackTimeMillis || 0,
    description: ep.description || ep.shortDescription || '',
    audioUrl: ep.episodeUrl || '',
  }));

  return { podcast, episodes };
}

export const itunesRepository: PodcastRepository = {
  getTopPodcasts,
  getPodcastDetails,
};
