import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeed, getSubreddits, followSubreddit, save, unsave, vote } from '../../api/feed';

export type Link = {
  subreddit: string;
  author: string;
  author_fullname: string;
  createdUtc: number;
  downs: number;
  gilded: number;
  id: string;
  numComments: number;
  score: number;
  subreddit_id: string;
  subreddit_type: string;
  ups: number;
  title: string;
  url: string;
  saved: boolean;
  likes: null | boolean;
  name: string;
};

export type Community = {
  banner_background_color: string;
  banner_background_image: string;
  acceptFollowers: boolean;
  community_icon: string;
  created_utc: number;
  advertiser_category: string;
  id: string;
  name: string;
  public_description: string;
  subreddit_type: string;
  subscribers: number;
  title: string;
  url: string;
  userIsSubscriber: boolean;
};

type FeedSliceInintialState = {
  Links: Link[];
  Communities: Community[];
};

type ThunkApiTypeSubscribeSubreddit = {
  action: string;
  action_source: string;
  skip_initial_defaults: boolean;
  sr_name: string;
};

type ThunkApiTypeSave = {
  name: string;
};

type ThunkApiTypeLike = {
  name: string;
  dir: number;
};

const initialState = { Links: [], Communities: [] } as FeedSliceInintialState;

export const fetchFeed = createAsyncThunk('feed/Feed', async () => {
  const response = await getFeed();
  return response?.data?.data;
});

export const fetchSubreddits = createAsyncThunk('feed/Subreddits', async () => {
  const response = await getSubreddits();
  return response?.data?.data;
});

export const SubscribeSubreddit = createAsyncThunk(
  'feed/Subscribe',
  async (thunkAPI: ThunkApiTypeSubscribeSubreddit) => {
    await followSubreddit(
      thunkAPI.action,
      thunkAPI.action_source,
      thunkAPI.skip_initial_defaults,
      thunkAPI.sr_name,
    );
    return thunkAPI.sr_name;
  },
);

export const SaveLink = createAsyncThunk('feed/Save', async (thunkAPI: ThunkApiTypeSave) => {
  await save(thunkAPI.name);
  return thunkAPI.name;
});

export const UnSaveLink = createAsyncThunk('feed/UnSave', async (thunkAPI: ThunkApiTypeSave) => {
  await unsave(thunkAPI.name);
  return thunkAPI.name;
});

export const VoteLink = createAsyncThunk('feed/Vote', async (thunkAPI: ThunkApiTypeLike) => {
  await vote(thunkAPI.name, thunkAPI.dir);
  return { name: thunkAPI.name, dir: thunkAPI.dir };
});

const FeedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      const refinedFeed = action.payload.children.map((elem: any) => {
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
        };
      });
      state.Links = [...refinedFeed];
    });
    builder.addCase(fetchSubreddits.fulfilled, (state, action) => {
      const refinedFeed = action.payload.children.map((elem: any) => {
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
        };
      });
      state.Communities = [...refinedFeed];
    });
    builder.addCase(SubscribeSubreddit.fulfilled, (state, action) => {
      state.Communities = state.Communities.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, userIsSubscriber: !elem.userIsSubscriber };
        }
        return { ...elem };
      });
    });
    builder.addCase(SaveLink.fulfilled, (state, action) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, saved: true };
        }
        return { ...elem };
      });
    });
    builder.addCase(UnSaveLink.fulfilled, (state, action) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, saved: false };
        }
        return { ...elem };
      });
    });
    builder.addCase(VoteLink.fulfilled, (state, action) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload.name) {
          if (!action.payload.dir)
            return { ...elem, likes: null, score: elem.score + (elem.likes ? -1 : 1) };
          return {
            ...elem,
            likes: action.payload.dir === 1,
            score:
              elem.score +
              action.payload.dir +
              (elem.likes === true ? -1 : 0) +
              (elem.likes === false ? +1 : 0),
          };
        }
        return { ...elem };
      });
    });
  },
});

export default FeedSlice;
