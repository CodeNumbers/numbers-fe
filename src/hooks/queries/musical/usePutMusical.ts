import { instance } from '@/lib/axios';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { PostMusicalListRequestBody } from './usePostMusicalList';

export type PutMusicalRequestBody = PostMusicalListRequestBody;

interface PutMusicalRequestParams {
  musicalId: string;
  body: PutMusicalRequestBody;
}

export const putMusical = async (musicalId: string, body: PutMusicalRequestBody) => {
  const response = await instance.put(`/musical/${musicalId}`, body);
  return response.data;
};

export const usePutMusical = (options?: UseMutationOptions<ApiSuccessResponse<undefined>, ApiFailureResponse, PutMusicalRequestParams>) => {
  return useMutation({
    mutationFn: ({ musicalId, body }: PutMusicalRequestParams) => putMusical(musicalId, body),
    ...options,
  });
};
