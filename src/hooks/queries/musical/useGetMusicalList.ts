import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { musicalQueryKey } from './musical.queryKey';
import { instance } from '@/lib/axios';
import type { GetPosterListResponseData } from '../poster/useGetPosterList';

export interface GetMusicalListParams {
  initialRange?: string;
}

export interface GetMusicalListResponseData {
  id: number;
  title: string;
  poster: GetPosterListResponseData[];
}

export type GetMusicalListResponse = ApiSuccessResponse<GetMusicalListResponseData[]>;

export const getMusicalList = async (params: GetMusicalListParams) => {
  const response = await instance.get('/musicals/filter', { params });
  return response.data;
};

export const useGetMusicalList = (params: GetMusicalListParams, options?: Partial<UseQueryOptions<GetMusicalListResponse>>) => {
  return useQuery({
    queryKey: musicalQueryKey.list(params),
    queryFn: () => getMusicalList(params),
    ...options,
  });
};
