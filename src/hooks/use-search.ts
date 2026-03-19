'use client';

import { useMemo } from 'react';
import { applyAdvancedSearch } from '@/lib/search/engine';
import { useAppStore } from '@/lib/store';

/**
 * @fileOverview Hook for consuming the Search Engine within Maison UI components.
 */
export function useSearch<T>(
  data: T[],
  query: string,
  filters: Record<string, any> = {}
) {
  const { currentUser } = useAppStore();

  const filteredResults = useMemo(() => {
    return applyAdvancedSearch(
      data,
      query,
      filters,
      currentUser?.role,
      currentUser?.country
    );
  }, [data, query, filters, currentUser]);

  return filteredResults;
}
