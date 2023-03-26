import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
  votePending: boolean;
  savePending: boolean;
  award: number;
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
  followPending: boolean;
};

type FeedSliceInintialState = {
  Links: Link[];
  Communities: Community[];
  fetchLinks: boolean;
  fetchSubreddits: boolean;
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

const initialState = {
  Links: [],
  Communities: [],
  fetchLinks: false,
  fetchSubreddits: false,
} as FeedSliceInintialState;

export const fetchFeed = createAsyncThunk('feed/Feed', async () => {
  const response = await getFeed();
  if (response.status === 200) return response.data.data.children;
  return [];
});

export const fetchSubreddits = createAsyncThunk('feed/Subreddits', async () => {
  const response = await getSubreddits();
  if (response.status === 200) return response.data.data.children;
  return [];
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
  reducers: {
    onFollowClicked: (state, action: PayloadAction<string>) => {
      state.Communities = state.Communities.map((elem) => {
        if (elem.name === action.payload) return { ...elem, followPending: true };
        return elem;
      });
    },
    onVoteClicked: (state, action: PayloadAction<string>) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload) return { ...elem, votePending: true };
        return elem;
      });
    },
    onSaveClicked: (state, action: PayloadAction<string>) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload) return { ...elem, savePending: true };
        return elem;
      });
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFeed.pending, (state) => {
      state.fetchLinks = true;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      const refinedFeed = action.payload.map((elem: any) => {
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
      state.Links = [...refinedFeed];
      state.fetchLinks = false;
    });
    builder.addCase(fetchFeed.rejected, (state) => {
      state.fetchLinks = false;
    });
    builder.addCase(fetchSubreddits.pending, (state) => {
      state.fetchSubreddits = true;
    });
    builder.addCase(fetchSubreddits.fulfilled, (state, action) => {
      const refinedFeed = action.payload.map((elem: any) => {
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
      state.Communities = [...refinedFeed];
      state.fetchSubreddits = false;
    });
    builder.addCase(fetchSubreddits.rejected, (state) => {
      state.fetchSubreddits = false;
    });
    builder.addCase(SubscribeSubreddit.fulfilled, (state, action) => {
      state.Communities = state.Communities.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, userIsSubscriber: !elem.userIsSubscriber, followPending: false };
        }
        return { ...elem };
      });
    });
    builder.addCase(SaveLink.fulfilled, (state, action) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, saved: true, savePending: false };
        }
        return { ...elem };
      });
    });
    builder.addCase(UnSaveLink.fulfilled, (state, action) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload) {
          return { ...elem, saved: false, savePending: false };
        }
        return { ...elem };
      });
    });
    builder.addCase(VoteLink.fulfilled, (state, action) => {
      state.Links = state.Links.map((elem) => {
        if (elem.name === action.payload.name) {
          if (!action.payload.dir)
            return {
              ...elem,
              votePending: false,
              likes: null,
              score: elem.score + (elem.likes ? -1 : 1),
            };
          return {
            ...elem,
            votePending: false,
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

export const { onFollowClicked, onSaveClicked, onVoteClicked } = FeedSlice.actions;
