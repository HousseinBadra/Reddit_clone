import axiosApiInstance from '../axiosInterceptor';

// export function getFeed() {
//   return axiosApiInstance.get('https://oauth.reddit.com/best?after=Link&limit=50', {
//     headers: { Authorization: `bearer ${localStorage.getItem('access_token') || ''}` },
//   });
// }

export function getFeed() {
  return axiosApiInstance.get('https://oauth.reddit.com/best?after=Link&limit=50');
}

export function getSpeceficFeed(subreddit: string, type: string) {
  return axiosApiInstance.get(
    `https://oauth.reddit.com/r/${subreddit}/${type}?after=Link&limit=50`,
  );
}

export function getSubreddits() {
  return axiosApiInstance.get('https://oauth.reddit.com/subreddits/default');
}

export function getSpeceficSubreddits(type: string) {
  return axiosApiInstance.get(`https://oauth.reddit.com/subreddits/${type}`);
}

export function getLinksByNames(names: string) {
  return axiosApiInstance.get(`https://oauth.reddit.com/by_id/names?names=${names}`);
}

export function followSubreddit(
  action: string,
  action_source: string,
  skip_initial_defaults: boolean,
  sr_name: string,
) {
  return axiosApiInstance.post(
    `https://oauth.reddit.com/api/subscribe?action=${action}&action_source=${action_source}&skip_initial_defaults=${skip_initial_defaults}&sr=${sr_name}`,
    {},
  );
}

export function getMySubreddits() {
  return axiosApiInstance.get('https://oauth.reddit.com//subreddits/mine/subscriber');
}

export function vote(id: string, direction: number) {
  return axiosApiInstance.post(
    `https://oauth.reddit.com//api/vote?dir=${direction}&id=${id}&rank=2`,
    {},
  );
}

export function save(id: string) {
  return axiosApiInstance.post(`https://oauth.reddit.com/api/save?category=t3&id=${id}`, {});
}

export function unsave(id: string) {
  return axiosApiInstance.post(`https://oauth.reddit.com/api/unsave?id=${id}`, {});
}
