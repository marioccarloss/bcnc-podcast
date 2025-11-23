import type { Meta, StoryObj } from '@storybook/react';
import { EpisodePlayer } from './episode-player';
import { Episode } from '@/domain/models/episode';

const meta: Meta<typeof EpisodePlayer> = {
  title: 'Episode/EpisodePlayer',
  component: EpisodePlayer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EpisodePlayer>;

const mockEpisode: Episode = {
  id: '1',
  title: 'Episode 1: Introduction to Podcasts',
  date: '2024-01-15',
  duration: 3600000,
  description:
    '<p>This is an <strong>introduction</strong> to podcasting. Learn about the basics and get started with your own show.</p>',
  audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

export const Default: Story = {
  args: {
    episode: mockEpisode,
  },
};

export const LongDescription: Story = {
  args: {
    episode: {
      ...mockEpisode,
      description:
        '<p>This is a very long description that contains multiple paragraphs.</p><p>It includes <strong>formatted text</strong>, <em>italics</em>, and other HTML elements.</p><p>This helps to demonstrate how the player handles longer content.</p>',
    },
  },
};
