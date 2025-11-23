import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    variant: {
      control: 'select',
      options: ['heading', 'subheading', 'body', 'caption', 'label'],
    },
    children: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Heading: Story = {
  args: {
    as: 'h1',
    variant: 'heading',
    children: 'Heading Text',
  },
};

export const Subheading: Story = {
  args: {
    as: 'h2',
    variant: 'subheading',
    children: 'Subheading Text',
  },
};

export const Body: Story = {
  args: {
    as: 'p',
    variant: 'body',
    children: 'Body Text. This is a paragraph.',
  },
};

export const Caption: Story = {
  args: {
    as: 'span',
    variant: 'caption',
    children: 'Caption Text',
  },
};
