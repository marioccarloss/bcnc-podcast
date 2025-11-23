import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'Primitives/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['square', 'circle'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Square: Story = {
  args: {
    src: 'https://placehold.co/100x100',
    alt: 'Placeholder Image',
    width: 100,
    height: 100,
    variant: 'square',
  },
};

export const Circle: Story = {
  args: {
    src: 'https://placehold.co/100x100',
    alt: 'Placeholder Image',
    width: 100,
    height: 100,
    variant: 'circle',
  },
};
