import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchFeed, fetchSubreddits, SubscribeSubreddit } from '../../features/feed/feedSlice';
import CommunitySubscribe from '../../components/CommunitySubscribe/CommunitySubscribe';
import LinkComponent from '../../components/LinkComponent/LinkComponent';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { Links, Communities } = useSelector((state: RootState) => state.feed);
  const { authenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch, authenticated]);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch, authenticated]);

  function onFollowButtonClicked(name: string, userIsSubscriber: boolean) {
    if (userIsSubscriber) {
      return dispatch(
        SubscribeSubreddit({
          action: 'unsub',
          action_source: 'o',
          skip_initial_defaults: false,
          sr_name: name,
        }),
      );
    }
    return dispatch(
      SubscribeSubreddit({
        action: 'sub',
        action_source: 'o',
        skip_initial_defaults: true,
        sr_name: name,
      }),
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid className="b-1" item md={3} sx={{ display: { md: 'block', xs: 'none' } }} />
      <Grid item xs={8} md={6}>
        <Stack spacing={2} mt={2}>
          {Links.map((elem) => {
            return <LinkComponent key={elem.id} {...elem} />;
          })}
        </Stack>
      </Grid>
      <Grid item xs={4} md={3}>
        <Stack spacing={2} mt={2} className="CommunityStack">
          {Communities.map((elem) => {
            return (
              <CommunitySubscribe
                key={elem.name}
                title={elem.title}
                acceptFollowers={elem.acceptFollowers}
                userIsSubscriber={elem.userIsSubscriber}
                onFollow={() => {
                  onFollowButtonClicked(elem.name, elem.userIsSubscriber);
                }}
              />
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}
