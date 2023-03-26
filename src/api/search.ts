import axiosApiInstance from '../axiosInterceptor';

export function search(q: string, filter: string, type: string) {
  return axiosApiInstance.get(`https://oauth.reddit.com/search?q=${q}&sort=${filter}&type=${type}`);
}
