import { instance } from '@/lib/axios';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export interface PostMusicalListRequestBody {
  poster: string;
  title: string;
  synopsis: string;
  numbers: {
    act: number;
    order: number;
    title: string;
    videoUrl: string;
    actors: string[];
  }[];
}

export async function postMusicalList(body: PostMusicalListRequestBody) {
  // poster/posters 필드 제외 - 서버 에러 방지
  // 간단한 JSON 방식으로 요청
  const requestData = {
    title: body.title,
    synopsis: body.synopsis,
    numbers: body.numbers,
  };

  // JSON 방식으로 전송 - 포스터 없이
  const response = await instance.post('/musicals', requestData);
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
