'use client';

import { useCallback } from 'react';

export const RESET_PODCAST_SEARCH_EVENT = 'podcast-search-reset';

export function useResetSearch() {
  return useCallback(() => {
    if (typeof window === 'undefined') return;

    window.dispatchEvent(new Event(RESET_PODCAST_SEARCH_EVENT));
  }, []);
}
