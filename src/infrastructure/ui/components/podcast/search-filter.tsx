import { Badge, Input } from '@/infrastructure/ui/components/primitives';
import { RefObject } from 'react';
import './search-filter.css';

interface SearchFilterProps {
  count: number;
  filterValue: string;
  onFilterChange: (value: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export function SearchFilter({ count, filterValue, onFilterChange, inputRef }: SearchFilterProps) {
  return (
    <div className="search-filter">
      <Badge>{count}</Badge>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Filter podcasts..."
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}
