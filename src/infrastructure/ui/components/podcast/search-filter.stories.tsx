import type { Meta, StoryObj } from '@storybook/react';
import { SearchFilter } from './search-filter';
import { useState } from 'react';

const meta: Meta<typeof SearchFilter> = {
  title: 'Podcast/SearchFilter',
  component: SearchFilter,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  args: {
    count: 100,
    filterValue: '',
    onFilterChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    count: 25,
    filterValue: 'tech',
    onFilterChange: () => {},
  },
};

function InteractiveExample() {
  const [filterValue, setFilterValue] = useState('');

  return <SearchFilter count={50} filterValue={filterValue} onFilterChange={setFilterValue} />;
}

export const Interactive: Story = {
  render: () => <InteractiveExample />,
};
