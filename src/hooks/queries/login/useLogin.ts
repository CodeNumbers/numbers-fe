import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { instance } from '@/lib/axios';
import { authQueryKey } from './auth.queryKey';

interface LoginRequestBody {
  id: string;
  password: string;
}

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export type LoginResponse = ApiSuccessResponse<LoginResponseData>;

export async function login(body: LoginRequestBody) {
  const { data } = await instance.post<LoginResponse>('/auth/signin', body);
  return data;
}

export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginRequestBody>) => {
  return useMutation({
    mutationKey: authQueryKey.login(),
    mutationFn: (body: LoginRequestBody) => login(body),
    ...options,
  });
};
