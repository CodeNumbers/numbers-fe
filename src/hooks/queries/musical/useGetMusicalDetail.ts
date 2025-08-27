import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { musicalQueryKey } from './musical.queryKey';
import { instance } from '@/lib/axios';

export interface MusicalNumber {
  title: string;
  videoUrl: string;
  actors: string[];
  act: number;
  order: number;
}

export interface GetMusicalDetailResponseData {
  title: string;
  synopsis: string;
  imageUrl: string;
  numbers: MusicalNumber[];
}

export type GetMusicalDetailResponse = ApiSuccessResponse<GetMusicalDetailResponseData>;

export const getMusicalDetail = async (musicalId: string) => {
  const response = await instance.get(`/musicals/${musicalId}`);
  return response.data;
};

export const useGetMusicalDetail = (musicalId: string, options?: UseQueryOptions<GetMusicalDetailResponse>) => {
  return useQuery({
    queryKey: musicalQueryKey.detail(musicalId),
    queryFn: () => getMusicalDetail(musicalId),
    ...options,
  });
};
