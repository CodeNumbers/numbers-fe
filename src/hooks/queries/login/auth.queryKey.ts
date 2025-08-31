export const authQueryKey = {
  all: () => ['auth'],
  login: () => [...authQueryKey.all(), 'login'],
  logout: () => [...authQueryKey.all(), 'logout'],
};
