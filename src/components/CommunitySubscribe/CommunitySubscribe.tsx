import React from 'react';
import { Card, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { SubscribeSubreddit, Community } from '../../features/feed/feedSlice';
import './CommunitySubscribe.css';

export default function CommunitySubscribe(props: Community) {
  const dispatch = useDispatch<AppDispatch>();
  const { name, title, userIsSubscriber, acceptFollowers } = props;

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
        {acceptFollowers && !userIsSubscriber && (
          <Button
            aria-label="previous"
            variant="contained"
            onClick={() => {
              dispatch(
                SubscribeSubreddit({
                  action: 'sub',
                  action_source: 'o',
                  skip_initial_defaults: true,
                  sr_name: name,
                }),
              );
            }}
          >
            {' '}
            Follow{' '}
          </Button>
        )}
        {acceptFollowers && userIsSubscriber && (
          <Button
            aria-label="previous"
            variant="contained"
            onClick={() => {
              dispatch(
                SubscribeSubreddit({
                  action: 'unsub',
                  action_source: 'o',
                  skip_initial_defaults: true,
                  sr_name: name,
                }),
              );
            }}
            disabled
          >
            {' '}
            Following{' '}
          </Button>
        )}
        {!acceptFollowers && (
          <Button aria-label="previous" variant="contained">
            Does not accept followers
          </Button>
        )}
      </div>
    </Card>
  );
}
