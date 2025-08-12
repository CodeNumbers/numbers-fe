import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { posterQueryKey } from './poster.queryKey';
import { instance } from '@/lib/axios';
import { type PosterKeyword } from './poster.constants';

export interface GetPosterListParams {
  keyword?: PosterKeyword;
}

export interface GetPosterListResponseData {
  id: number;
  imageUrl: string;
}

export type GetPosterListResponse = ApiSuccessResponse<GetPosterListResponseData[]>;

export const getPosterList = async (params: GetPosterListParams) => {
  const response = await instance.get('/posters/search', { params });
  return response.data;
};

export const useGetPosterList = (
  params: GetPosterListParams,
  options?: Partial<UseQueryOptions<GetPosterListResponse>>
) => {
  return useQuery({
    queryKey: posterQueryKey.list(params),
    queryFn: () => getPosterList(params),
    ...options,
  });
};
