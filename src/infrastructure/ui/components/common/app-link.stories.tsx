import type { Meta, StoryObj } from '@storybook/react';
import { AppLink } from './app-link';
import { NavigationProvider } from '@/infrastructure/ui/context';

const meta: Meta<typeof AppLink> = {
  title: 'Common/AppLink',
  component: AppLink,
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
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AppLink>;

export const Default: Story = {
  args: {
    href: '/',
    children: 'Go to Home',
  },
};
