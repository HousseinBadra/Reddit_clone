import axiosApiInstance from '../axiosInterceptor';

export function search(q: string) {
  return axiosApiInstance.get(`https://oauth.reddit.com/search?q=${q}`, {
    headers: { Authorization: `bearer ${localStorage.getItem('access_token') || ''}` },
  });
}
