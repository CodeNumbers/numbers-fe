import type { GetPosterListParams } from './useGetPosterList';

export const posterQueryKey = {
  all: () => ['poster'],
  list: (params: GetPosterListParams) => [...posterQueryKey.all(), 'list', params],
  detail: (id: string) => [...posterQueryKey.all(), 'detail', id],
};
