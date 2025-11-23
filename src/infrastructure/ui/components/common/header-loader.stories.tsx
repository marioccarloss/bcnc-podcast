import type { Meta, StoryObj } from '@storybook/react';
import { HeaderLoader } from './header-loader';
import { NavigationProvider } from '@/infrastructure/ui/context';

const meta: Meta<typeof HeaderLoader> = {
  title: 'Common/HeaderLoader',
  component: HeaderLoader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <NavigationProvider>
        <div style={{ position: 'relative', height: '100px' }}>
          <Story />
        </div>
      </NavigationProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeaderLoader>;

export const Default: Story = {};
