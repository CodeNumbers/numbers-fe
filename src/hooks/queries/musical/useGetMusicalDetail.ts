import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { musicalQueryKey } from './musical.queryKey';
import { instance } from '@/lib/axios';

export const getMusicalDetail = async (id: string) => {
  const response = await instance.get(`/musicals/${id}`);
  return response.data;
};

export const useGetMusicalDetail = (id: string, options?: UseQueryOptions) => {
  return useQuery({
    queryKey: musicalQueryKey.detail(id),
    queryFn: () => getMusicalDetail(id),
    ...options,
  });
};
