import './search-filter.css';

interface SearchFilterProps {
  count: number;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

export function SearchFilter({ count, filterValue, onFilterChange }: SearchFilterProps) {
  return (
    <div className="search-filter">
      <span className="search-filter__count">{count}</span>
      <input
        type="text"
        placeholder="Filter podcasts..."
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        className="search-filter__input"
      />
    </div>
  );
}
