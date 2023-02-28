import React, { useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  //   useEffect(() => {
  //     fetch('https://oauth.reddit.com/api/v1/me', {
  //       method: 'GET',
  //       headers: { Authorization: `bearer ${localStorage.getItem('access_token')}` },
  //     })
  //       .then((r) => r.json())
  //       .then((r) => console.log(r));
  //   });

  useEffect(() => {
    axios
      .get('https://oauth.reddit.com/subreddits/popular', {
        method: 'GET',
        headers: { Authorization: `bearer ${localStorage.getItem('access_token')}` },
      })
      .then((r) => console.log(r));
  });
  return <div>Profile</div>;
}
