'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface SearchFilterContextType {
  filter: string;
  setFilter: (value: string) => void;
  resetFilter: () => void;
}

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export function SearchFilterProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState('');

  const resetFilter = useCallback(() => setFilter(''), []);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      resetFilter,
    }),
    [filter, resetFilter]
  );

  return <SearchFilterContext.Provider value={value}>{children}</SearchFilterContext.Provider>;
}

export function useSearchFilter() {
  const context = useContext(SearchFilterContext);
  if (context === undefined) {
    throw new Error('useSearchFilter debe utilizarse dentro de un SearchFilterProvider');
  }
  return context;
}
