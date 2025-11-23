import type { Meta, StoryObj } from '@storybook/react';
import { EpisodeList } from './episode-list';
import { Episode } from '@/domain/models/episode';

const meta: Meta<typeof EpisodeList> = {
  title: 'Episode/EpisodeList',
  component: EpisodeList,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof EpisodeList>;

const mockEpisodes: Episode[] = [
  {
    id: '1',
    title: 'Episode 1: Introduction to Podcasts',
    date: '2024-01-15',
    duration: 3600000, // 1 hour in milliseconds
    description: 'An introduction to podcasting',
    audioUrl: 'https://example.com/audio1.mp3',
  },
  {
    id: '2',
    title: 'Episode 2: Advanced Topics',
    date: '2024-01-22',
    duration: 5400000, // 1.5 hours in milliseconds
    description: 'Diving deeper into advanced topics',
    audioUrl: 'https://example.com/audio2.mp3',
  },
  {
    id: '3',
    title: 'Episode 3: Q&A Session',
    date: '2024-01-29',
    duration: 2700000, // 45 minutes in milliseconds
    description: 'Answering listener questions',
    audioUrl: 'https://example.com/audio3.mp3',
  },
];

export const Default: Story = {
  args: {
    episodes: mockEpisodes,
    podcastId: 'podcast-123',
  },
};

export const SingleEpisode: Story = {
  args: {
    episodes: [mockEpisodes[0]],
    podcastId: 'podcast-123',
  },
};

export const NoEpisodes: Story = {
  args: {
    episodes: [],
    podcastId: 'podcast-123',
  },
};
