import React from 'react';
import { Button } from '@mui/material';
import useGetToken from '../../hooks/useGetToken';
import './AuthenticationPAge.scss';
import { uuidv4 } from '../../utils/uuid';

export default function AuthenticationPage() {
  useGetToken();
  const { VITE_SECRET, VITE_URI } = import.meta.env;
  const scopeArray: string[] = ['identity', 'read'];
  return (
    <div className="AuthenticationPage">
      <Button
        variant="contained"
        href={`https://www.reddit.com/api/v1/authorize?client_id=${VITE_SECRET}&response_type=code&state=${uuidv4()}&redirect_uri=${VITE_URI}&duration=permanent&scope=${scopeArray.join(
          ' ',
        )}`}
      >
        Sign in
      </Button>
    </div>
  );
}
