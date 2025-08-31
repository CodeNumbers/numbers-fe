import { useMutation } from '@tanstack/react-query';
import { instance } from '@/lib/axios';
import { authQueryKey } from './auth.queryKey';

export async function logout() {
  await instance.post('/auth/logout');
}

export const useLogout = () => {
  return useMutation({
    mutationKey: authQueryKey.logout(),
    mutationFn: () => logout(),
  });
};
