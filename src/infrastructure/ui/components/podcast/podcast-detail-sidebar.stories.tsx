import type { Meta, StoryObj } from '@storybook/react';
import { PodcastDetailSidebar } from './podcast-detail-sidebar';
import { Podcast } from '@/domain/models/podcast';
import { NavigationProvider } from '@/infrastructure/ui/context';

const meta: Meta<typeof PodcastDetailSidebar> = {
  title: 'Podcast/PodcastDetailSidebar',
  component: PodcastDetailSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NavigationProvider>
        <div style={{ maxWidth: '350px' }}>
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
type Story = StoryObj<typeof PodcastDetailSidebar>;

const mockPodcast: Podcast = {
  id: '1',
  title: 'The Tech Podcast',
  author: 'John Doe',
  image: 'https://placehold.co/300x300',
  summary:
    'A podcast about technology and innovation. We discuss the latest trends in software development, AI, and digital transformation.',
};

export const Default: Story = {
  args: {
    podcast: mockPodcast,
  },
};

export const LongDescription: Story = {
  args: {
    podcast: {
      ...mockPodcast,
      summary:
        'This is a very comprehensive podcast that covers a wide range of topics in the technology sector. From software development best practices, to the latest trends in artificial intelligence, machine learning, cloud computing, and digital transformation. We bring you expert insights, interviews with industry leaders, and practical advice for both beginners and experienced professionals.',
    },
  },
};
