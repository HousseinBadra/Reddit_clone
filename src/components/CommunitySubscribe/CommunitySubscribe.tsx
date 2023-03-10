import React from 'react';
import { Card, Button } from '@mui/material';
import './CommunitySubscribe.css';

type CommunitySubscribeProps = {
  onFollow: () => void;
  acceptFollowers: boolean;
  title: string;
  userIsSubscriber: boolean;
};

export default function CommunitySubscribe(props: CommunitySubscribeProps) {
  const { title, userIsSubscriber, acceptFollowers, onFollow } = props;

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-evenly' }} className="community-subscribe">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '15ch',
        }}
      >
        {' '}
        {title}
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}
      >
        {acceptFollowers && (
          <Button
            aria-label="previous"
            variant="contained"
            onClick={() => {
              onFollow();
            }}
          >
            {!userIsSubscriber ? 'Follow' : 'UnFollow'}
          </Button>
        )}
        {!acceptFollowers && (
          <Button aria-label="previous" variant="contained" disabled>
            Follow
          </Button>
        )}
      </div>
    </Card>
  );
}
