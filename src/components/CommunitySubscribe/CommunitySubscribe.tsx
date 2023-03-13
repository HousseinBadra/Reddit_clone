import React from 'react';
import { Card, Button } from '@mui/material';
import './CommunitySubscribe.css';

type CommunitySubscribeProps = {
  onFollow: () => void;
  acceptFollowers: boolean;
  title: string;
  userIsSubscriber: boolean;
  isXs: boolean;
};

export default function CommunitySubscribe(props: CommunitySubscribeProps) {
  const { title, userIsSubscriber, acceptFollowers, onFollow, isXs } = props;

  return (
    <div>
      {!isXs && (
        <Card
          sx={{ display: 'flex', justifyContent: 'space-evenly', borderRadius: '10px' }}
          className="community-subscribe"
        >
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
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '50%',
            }}
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
      )}
      {isXs && (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            borderRadius: '10px',
            flexDirection: 'column',
          }}
          className="community-subscribe"
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '15ch',
              margin: '0 auto',
            }}
          >
            {' '}
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '80%',
              margin: '0 auto',
            }}
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
      )}
    </div>
  );
}
