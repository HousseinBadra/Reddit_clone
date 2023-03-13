import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    <Grid
      container
      spacing={2}
      maxWidth="md"
      className="mainGrid"
      sx={{ flexDirection: { xs: 'column-reverse', sm: 'row' } }}
    >
      <Grid item xs={12} sm={7} justifyContent="center">
        <Stack spacing={2}>
          {Links.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage <= Links.length
              ? page * rowsPerPage + rowsPerPage
              : Links.length,
          ).map((elem) => {
            return <LinkComponent key={elem.id} {...elem} />;
          })}
          <TablePagination
            style={{ margin: '0 auto' }}
            component="div"
            count={Links.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={5} justifyContent="center">
        <Stack
          spacing={2}
          className="CommunityStack"
          sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: { xs: 'row', sm: 'column' } }}
        >
          {Communities.slice(0, 5).map((elem) => {
            return (
              <CommunitySubscribe
                key={elem.name}
                title={elem.title}
                acceptFollowers={elem.acceptFollowers}
                userIsSubscriber={elem.userIsSubscriber}
                isXs={false}
                onFollow={() => {
                  onFollowButtonClicked(elem.name, elem.userIsSubscriber);
                }}
              />
            );
          })}
        </Stack>
        <Stack
          spacing={2}
          className="CommunityStackMobile"
          sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: { xs: 'row', sm: 'column' } }}
        >
          {Communities.slice(0, 5).map((elem) => {
            return (
              <CommunitySubscribe
                key={elem.name}
                title={elem.title}
                acceptFollowers={elem.acceptFollowers}
                userIsSubscriber={elem.userIsSubscriber}
                isXs
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
