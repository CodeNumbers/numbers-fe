import { instance } from '@/lib/axios';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const deleteMusical = async (musicalId: string) => {
  const response = await instance.delete(`/musical/${musicalId}`);
  return response.data;
};

export const useDeleteMusical = (options?: UseMutationOptions<ApiSuccessResponse<undefined>, ApiFailureResponse, string>) => {
  return useMutation({
    mutationFn: (musicalId: string) => deleteMusical(musicalId),
    ...options,
  });
};
