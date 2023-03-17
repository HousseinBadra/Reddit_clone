import axiosApiInstance from '../axiosInterceptor';

export function search(q: string, filter: string, type: string, limit: number) {
  return axiosApiInstance.get(
    `https://oauth.reddit.com/search?limit=${limit}&q=${q}&sort=${filter}&type=${type}`,
  );
}
