import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Link, Community } from '../feed/feedSlice';
import { search } from '../../api/search';
import { followSubreddit } from '../../api/feed';

type SearchSliceInintialState = {
  searchingLinks: boolean;
  searchingCommunities: boolean;
  query: string;
  filter: string;
  links: Link[];
  communities: Community[];
};

type ThunkAPISearch = {
  query: string;
  filter: string;
};

type ThunkApiTypeSubscribeCommunity = {
  action: string;
  action_source: string;
  skip_initial_defaults: boolean;
  sr_name: string;
};

const initialState = {
  searching: false,
  query: '',
  filter: 'relevance',
  links: [],
  communities: [],
  searchingLinks: false,
  searchingCommunities: false,
} as SearchSliceInintialState;

export const searchLinks = createAsyncThunk('search/Links', async (ThunkAPI: ThunkAPISearch) => {
  const response = await search(ThunkAPI.query, ThunkAPI.filter, 'link', 100);
  if (response.status === 200) return response.data.data.children;
  return [];
});

export const searchSubreddits = createAsyncThunk(
  'search/Subreddits',
  async (ThunkAPI: ThunkAPISearch) => {
    const response = await search(ThunkAPI.query, ThunkAPI.filter, 'sr', 5);
    if (response.status === 200) return response.data.data.children;
    return [];
  },
);

export const SubscribeCommunity = createAsyncThunk(
  'feed/Subscribe',
  async (thunkAPI: ThunkApiTypeSubscribeCommunity) => {
    await followSubreddit(
      thunkAPI.action,
      thunkAPI.action_source,
      thunkAPI.skip_initial_defaults,
      thunkAPI.sr_name,
    );
    return thunkAPI.sr_name;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    onFollowClicked: (state, action: PayloadAction<string>) => {
      state.communities = state.communities.map((elem) => {
        if (elem.name === action.payload) return { ...elem, followPending: true };
        return elem;
      });
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(searchLinks.pending, (state) => {
      state.searchingLinks = true;
    });
    builder.addCase(searchLinks.fulfilled, (state, action) => {
      const refinedLinks = action.payload.map((elem: any) => {
        return {
          subreddit: elem?.data?.subreddit,
          author: elem?.data?.author,
          author_fullname: elem.data.author_fullname,
          createdUtc: elem.data.created_utc,
          downs: elem.data.downs,
          gilded: elem.data.gilded,
          id: elem.data.id,
          numComments: elem.data.num_comments,
          score: elem.data.score,
          subreddit_id: elem.data.subreddit_id,
          subreddit_type: elem.data.subreddit_type,
          ups: elem.data.ups,
          title: elem.data.title,
          url: elem.data.url,
          saved: elem.data.saved,
          likes: elem.data.likes,
          name: elem.data.name,
          votePending: false,
          savePending: false,
          award: elem.data.all_awardings.length,
        };
      });
      state.links = [...refinedLinks];
      state.searchingLinks = false;
    });
    builder.addCase(searchLinks.rejected, (state) => {
      state.searchingLinks = false;
    });
    builder.addCase(searchSubreddits.pending, (state) => {
      state.searchingCommunities = true;
    });
    builder.addCase(searchSubreddits.fulfilled, (state, action) => {
      const refinedCommunities = action.payload.map((elem: any) => {
        return {
          banner_background_color: elem.data.banner_background_color,
          banner_background_image: elem.data.banner_background_image,
          acceptFollowers: elem.data.accept_followers,
          community_icon: elem.data.community_icon,
          created_utc: elem.data.created_utc,
          advertiser_category: elem.data.advertiser_category,
          id: elem.data.id,
          name: elem.data.name,
          public_description: elem.data.public_description,
          subreddit_type: elem.data.subreddit_type,
          subscribers: elem.data.subscribers,
          title: elem.data.title,
          url: elem.data.url,
          userIsSubscriber: elem.data.user_is_subscriber,
          followPending: false,
        };
      });
      state.communities = [...refinedCommunities];
      state.searchingCommunities = false;
    });
    builder.addCase(searchSubreddits.rejected, (state) => {
      state.searchingCommunities = false;
    });
    builder.addCase(SubscribeCommunity.fulfilled, (state, action) => {
      state.communities = state.communities.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, userIsSubscriber: !elem.userIsSubscriber, followPending: false };
        }
        return { ...elem };
      });
    });
  },
});

export default searchSlice;

export const { setQuery, setFilter, onFollowClicked } = searchSlice.actions;
