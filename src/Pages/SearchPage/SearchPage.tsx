import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import { Grid, Stack, CircularProgress } from '@mui/material';
import {
  searchLinks,
  searchSubreddits,
  SubscribeCommunity,
  onFollowClicked,
} from '../../features/search/seachSlice';
import { AppDispatch, RootState } from '../../store';
import SearchCommunity from '../../components/SearchCommunity/SearchCommunity';
import SearchLink from '../../components/SearchLink/SearchLink';
import './SearchPage.css';

export default function SearchPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { links, communities, filter, query, searchingLinks } = useSelector(
    (state: RootState) => state.search,
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(searchLinks({ query, filter }));
    dispatch(searchSubreddits({ query, filter }));
  }, [query, filter, dispatch]);

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
        SubscribeCommunity({
          action: 'unsub',
          action_source: 'o',
          skip_initial_defaults: false,
          sr_name: name,
        }),
      );
    }
    return dispatch(
      SubscribeCommunity({
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
        {searchingLinks ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />{' '}
          </div>
        ) : (
          <div>
            <div style={{ maxHeight: '80vh', overflowY: 'scroll' }} ref={scrollRef}>
              <Stack spacing={2} gap={1}>
                {links
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage <= links.length
                      ? page * rowsPerPage + rowsPerPage
                      : links.length,
                  )
                  .map((elem) => {
                    return <SearchLink key={elem.id} {...elem} />;
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
              count={links.length}
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
          {communities.slice(0, 5).map((elem) => {
            return (
              <SearchCommunity
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
