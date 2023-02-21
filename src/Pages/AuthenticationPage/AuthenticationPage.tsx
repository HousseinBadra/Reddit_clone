import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setAuth } from '../../features/auth/auth';

export default function AuthenticationPage() {
  const navigate = useNavigate();
  const query = window.location.search;
  const uri = window.location.href;
  const dispatch: AppDispatch = useDispatch();
  // const client = 'YsJl8gazQ52xItqGTGOffQ';
  // const secret = 'LCSeTxp8mvTwynThqCUHihu396MSkQ';
  const encoded = 'WXNKbDhnYXpRNTJ4SXRxR1RHT2ZmUTpMQ1NlVHhwOG12VHd5blRocUNVSGlodTM5Nk1Ta1E=';

  useEffect(() => {
    if (query.indexOf('error') !== -1 || query === '') {
      navigate('/');
    } else {
      const code: string = query.split('&')[1].split('=')[1];

      fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        // mode: 'cors',
        // credentials: 'same-origin',
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${'http://localhost:5173/Authentication'}`,
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.access_token) {
            dispatch(
              setAuth({
                refresh_token: r.refresh_token,
                access_token: r.access_token,
              }),
            );
          }
          navigate('/');
        })
        .catch((err) => {
          navigate('/');
          console.log(err);
        });
    }
  }, [query, navigate, uri, dispatch, encoded]);

  return <div>AuthenticationPage</div>;
}
