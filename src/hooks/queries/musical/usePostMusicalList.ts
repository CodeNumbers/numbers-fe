import { instance } from '@/lib/axios';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export interface PostMusicalListRequestBody {
  poster: string;
  title: string;
  info: string;
  acts: {
    title: number;
    numbers: {
      order: number;
      youtubeLink: string;
      title: string;
      actors: { name: string }[];
    }[];
  }[];
}

export async function postMusicalList(body: PostMusicalListRequestBody) {
  const response = await instance.post('/musicals', body);
  return response.data;
}

export function usePostMusicalList(
  options?: Partial<UseMutationOptions<ApiSuccessResponse<undefined>, ApiFailureResponse, PostMusicalListRequestBody>>
) {
  return useMutation({
    mutationFn: (body: PostMusicalListRequestBody) => postMusicalList(body),
    ...options,
  });
}
