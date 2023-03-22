import React from 'react';
import { Card, Button } from '@mui/material';
import './CommunitySubscribe.css';

type CommunitySubscribeProps = {
  onFollow: () => void;
  acceptFollowers: boolean;
  title: string;
  userIsSubscriber: boolean;
  followPending: boolean;
};

export default function CommunitySubscribe(props: CommunitySubscribeProps) {
  const { title, userIsSubscriber, acceptFollowers, onFollow, followPending } = props;

  return (
    <div>
      <Card
        sx={{ display: 'flex', justifyContent: 'space-evenly', borderRadius: '10px' }}
        className="community-subscribe"
      >
        <div
          className="title-div"
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
          className="button-div"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '50%',
          }}
        >
          {acceptFollowers && (
            <Button
              disabled={followPending}
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
    </div>
  );
}
