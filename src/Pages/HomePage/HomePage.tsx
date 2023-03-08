import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/navbar/Navbar';
import { AppDispatch, RootState } from '../../store';
import { fetchFeed, fetchSubreddits } from '../../features/feed/feedSlice';
import CommunitySubscribe from '../../components/CommunitySubscribe/CommunitySubscribe';
import LinkComponent from '../../components/LinkComponent/LinkComponent';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { Links, Communities } = useSelector((state: RootState) => state.feed);
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <>
      <Navbar />
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
              return <CommunitySubscribe key={elem.name} {...elem} />;
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
