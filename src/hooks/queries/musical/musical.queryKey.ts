import type { GetMusicalListParams } from './useGetMusicalList';

export const musicalQueryKey = {
  all: () => ['musical'],
  list: (params: GetMusicalListParams) => [...musicalQueryKey.all(), 'list', params],
  detail: (id: string) => [...musicalQueryKey.all(), 'detail', id],
};
