import axios from 'axios';

export function search(access_token: string, q: string) {
  return axios.get(`https://oauth.reddit.com/search?q=${q}`, {
    method: 'GET',
    headers: { Authorization: `bearer ${access_token}` },
  });
}
