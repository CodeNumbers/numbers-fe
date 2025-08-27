import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { posterQueryKey } from './poster.queryKey';
import { instance } from '@/lib/axios';

export const POSTER_SEARCH_KEYWORD = {
  RANDOM: 'random',
  VIEWS: 'views',
} as const;

export interface GetPosterListParams {
  mode?: (typeof POSTER_SEARCH_KEYWORD)[keyof typeof POSTER_SEARCH_KEYWORD];
  limit?: number;
  initialRange?: string;
  musicalId?: number;
}

export interface GetPosterListResponseData {
  musicalId: number;
  title: string;
  imageUrl: string;
}

export type GetPosterListResponse = ApiSuccessResponse<GetPosterListResponseData[]>;

export const getPosterList = async (params: GetPosterListParams) => {
  const response = await instance.get('/posters', { params });
  return response.data;
};

export const useGetPosterList = (params: GetPosterListParams, options?: Partial<UseQueryOptions<GetPosterListResponse>>) => {
  return useQuery({
    queryKey: posterQueryKey.list(params),
    queryFn: () => getPosterList(params),
    ...options,
  });
};
