import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { posterQueryKey } from './poster.queryKey';
import { instance } from '@/lib/axios';

export interface GetPosterListParams {
  keyword?: string;
}

export const getPosterList = async (params: GetPosterListParams) => {
  const response = await instance.get('/posters', { params });
  return response.data;
};

export const useGetPosterList = (params: GetPosterListParams, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: posterQueryKey.list(params),
    queryFn: () => getPosterList(params),
    ...options,
  });
};
