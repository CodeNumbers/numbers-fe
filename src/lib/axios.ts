import axios from 'axios';

export const instance = axios.create({ baseURL: '/api', withCredentials: true });

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken');
  console.log('로그인 응답:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
