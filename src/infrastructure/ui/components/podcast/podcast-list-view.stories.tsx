import type { Meta, StoryObj } from '@storybook/react';
import { PodcastListView } from './podcast-list-view';
import { Podcast } from '@/domain/models/podcast';
import { NavigationProvider } from '@/infrastructure/ui/context';

const meta: Meta<typeof PodcastListView> = {
  title: 'Podcast/PodcastListView',
  component: PodcastListView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NavigationProvider>
        <Story />
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
type Story = StoryObj<typeof PodcastListView>;

const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'The Tech Podcast',
    author: 'John Doe',
    image: 'https://placehold.co/170x170',
    summary: 'A podcast about technology',
  },
  {
    id: '2',
    title: 'Science Weekly',
    author: 'Jane Smith',
    image: 'https://placehold.co/170x170',
    summary: 'Weekly science discussions',
  },
  {
    id: '3',
    title: 'Business Insights',
    author: 'Bob Johnson',
    image: 'https://placehold.co/170x170',
    summary: 'Business and entrepreneurship',
  },
  {
    id: '4',
    title: 'Creative Minds',
    author: 'Alice Brown',
    image: 'https://placehold.co/170x170',
    summary: 'Creativity and design',
  },
];

export const Default: Story = {
  args: {
    podcasts: mockPodcasts,
  },
};

export const ManyPodcasts: Story = {
  args: {
    podcasts: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Podcast ${i + 1}`,
      author: `Author ${i + 1}`,
      image: 'https://placehold.co/170x170',
      summary: `Summary for podcast ${i + 1}`,
    })),
  },
};

export const NoPodcasts: Story = {
  args: {
    podcasts: [],
  },
};
