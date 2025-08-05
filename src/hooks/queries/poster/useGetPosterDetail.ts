import { useQuery } from '@tanstack/react-query';
import { posterQueryKey } from './poster.queryKey';
import { instance } from '@/lib/axios';

export const getPosterDetail = async (id: string) => {
  const response = await instance.get(`/posters/${id}`);
  return response.data;
};

export const useGetPosterDetail = (id: string) => {
  return useQuery({
    queryKey: posterQueryKey.detail(id),
    queryFn: () => getPosterDetail(id),
    enabled: !!id,
  });
};
