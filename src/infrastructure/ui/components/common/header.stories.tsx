import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';
import { NavigationProvider } from '@/infrastructure/ui/context';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
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
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
