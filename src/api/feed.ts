import axiosApiInstance from '../axiosInterceptor';

export function getFeed() {
  return axiosApiInstance.get('https://oauth.reddit.com/best?after=Link&limit=50', {
    headers: { Authorization: `bearer ${localStorage.getItem('access_token') || ''}}` },
  });
}

export function getSpeceficFeed(subreddit: string, type: string) {
  return axiosApiInstance.get(
    `https://oauth.reddit.com/r/${subreddit}/${type}?after=Link&limit=50`,
    {
      headers: { Authorization: `bearer ${localStorage.getItem('access_token') || ''}` },
    },
  );
}

export function getSubreddits() {
  return axiosApiInstance.get('https://oauth.reddit.com/subreddits/default', {
    headers: { Authorization: `bearer ${localStorage.getItem('access_token') || ''}` },
  });
}

export function getSpeceficSubreddits(type: string) {
  return axiosApiInstance.get(`https://oauth.reddit.com/subreddits/${type}`, {
    headers: { Authorization: `bearer ${localStorage.getItem('access_token') || ''}` },
  });
}
