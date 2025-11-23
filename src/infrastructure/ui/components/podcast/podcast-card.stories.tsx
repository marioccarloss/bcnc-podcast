import type { Meta, StoryObj } from '@storybook/react';
import { PodcastCard } from './podcast-card';
import { Podcast } from '@/domain/models/podcast';
import { NavigationProvider } from '@/infrastructure/ui/context';

const meta: Meta<typeof PodcastCard> = {
  title: 'Podcast/PodcastCard',
  component: PodcastCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NavigationProvider>
        <div style={{ maxWidth: '400px' }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof PodcastCard>;

const mockPodcast: Podcast = {
  id: '1',
  title: 'The Tech Podcast',
  author: 'John Doe',
  image: 'https://placehold.co/170x170',
  summary: 'A podcast about technology and innovation',
};

export const Default: Story = {
  args: {
    podcast: mockPodcast,
  },
};

export const LongTitle: Story = {
  args: {
    podcast: {
      ...mockPodcast,
      title: 'The Very Long Title for a Technology and Innovation Podcast Show',
    },
  },
};
