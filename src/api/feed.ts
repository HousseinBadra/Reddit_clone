import axios from 'axios';

export function getFeed(access_token: string) {
  return axios.get('https://oauth.reddit.com/best?after=Link&limit=50', {
    method: 'GET',
    headers: { Authorization: `bearer ${access_token}}` },
  });
}

export function getSpeceficFeed(access_token: string, subreddit: string, type: string) {
  return axios.get(`https://oauth.reddit.com/r/${subreddit}/${type}?after=Link&limit=50`, {
    method: 'GET',
    headers: { Authorization: `bearer ${access_token}` },
  });
}

export function getSpeceficSubreddits(access_token: string, type: string) {
  return axios.get(`https://oauth.reddit.com/subreddits/${type}`, {
    method: 'GET',
    headers: { Authorization: `bearer ${access_token}` },
  });
}
