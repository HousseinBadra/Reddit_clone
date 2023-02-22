import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AppDispatch } from '../store';
import { setAuth } from '../features/auth/auth';

export default function useGetToken(): void {
  const navigate = useNavigate();
  const query = window.location.search;
  const dispatch: AppDispatch = useDispatch();

  const { VITE_ENCODED, VITE_URI } = import.meta.env;

  useEffect(() => {
    if (query.indexOf('error') !== -1 || query === '') {
      navigate('/');
    } else {
      const code: string = query.split('&')[1].split('=')[1];
      const { VITE_ACCESS_TOKEN_URL } = import.meta.env;

      axios
        .post(
          VITE_ACCESS_TOKEN_URL || '',
          `grant_type=authorization_code&code=${code}&redirect_uri=${VITE_URI}`,
          {
            headers: {
              Authorization: `Basic ${VITE_ENCODED}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
        .then((r) => {
          if (r.data.access_token) {
            dispatch(
              setAuth({
                refresh_token: r.data.refresh_token,
                access_token: r.data.access_token,
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
  });
}
