import axios from 'axios';

export default async function refreshToken(refresh_token: string) {
  const { VITE_ENCODED } = import.meta.env;

  return axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=refresh_token&refresh_token=${refresh_token}`,
      {
        headers: {
          Authorization: `Basic ${VITE_ENCODED}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((r) => {
      if (r.status === 200) {
        localStorage.setItem('access_token', r.data.access_token);
        localStorage.setItem('refresh_token', r.data.refresh_token);
        return r;
      }
      return r;
    });
}
