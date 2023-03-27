import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Stack, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  fetchFeed,
  fetchSubreddits,
  SubscribeSubreddit,
  onFollowClicked,
} from '../../features/feed/feedSlice';
import CommunitySubscribe from '../../components/CommunitySubscribe/CommunitySubscribe';
import LinkComponent from '../../components/LinkComponent/LinkComponent';
import './HomePage.css';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { Links, Communities, fetchLinks } = useSelector((state: RootState) => state.feed);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    scrollRef.current?.scrollTo(0, 0);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    scrollRef.current?.scrollTo(0, 0);
  };

  function onFollowButtonClicked(name: string, userIsSubscriber: boolean) {
    dispatch(onFollowClicked(name));
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
      <Grid item xs={12} sm={7} justifyContent="center" alignItems="center">
        {fetchLinks ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />{' '}
          </div>
        ) : (
          <div>
            <div style={{ maxHeight: '80vh', overflowY: 'scroll' }} ref={scrollRef}>
              <Stack spacing={2} gap={1}>
                {Links.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage <= Links.length
                    ? page * rowsPerPage + rowsPerPage
                    : Links.length,
                ).map((elem) => {
                  return <LinkComponent key={elem.id} {...elem} />;
                })}
              </Stack>
            </div>
            <TablePagination
              style={{
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              component="div"
              count={Links.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
      </Grid>
      <Grid item xs={12} sm={5} justifyContent="center" alignItems="center">
        <Stack
          className="CommunityStack"
          sx={{ display: { xs: 'flex', sm: 'flex' }, flexDirection: { xs: 'row', sm: 'column' } }}
        >
          {Communities.slice(0, 5).map((elem) => {
            return (
              <CommunitySubscribe
                key={elem.name}
                title={elem.title}
                acceptFollowers={elem.acceptFollowers}
                userIsSubscriber={elem.userIsSubscriber}
                followPending={elem.followPending}
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
