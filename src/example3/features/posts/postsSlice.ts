import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/example3/store/store";
import { sub } from "date-fns";
import { IPost, TReaction } from "../types";
import { IPostsState } from "../types/index";
import axios from "axios";

// const day = () => {
//   return sub(new Date(), { minutes: 10 }).toISOString();
// };

const initialState: IPostsState = {
  posts: [],
  status: "idle",
  error: undefined,
};

const POSTS_URL = "http://localhost:3500/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get<IPost[]>(POSTS_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Error when get posts: ${error.message}`);
      throw {
        message: `Failed to fetch posts, ${error.message}`,
        status: 500,
      };
    } else {
      console.log("unexpected error: ", error);
      throw {
        message: `Failed to fetch posts: ${error}`,
        status: 500,
      };
    }
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        state.posts.push(action.payload);
      },
      prepare({
        title,
        content,
        userId,
      }: {
        title: string;
        content: string;
        userId: string;
      }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reaction: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(
      state,
      action: PayloadAction<{ postId: string; reaction: TReaction }>
    ) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        if (existingPost.reaction) {
          existingPost.reaction[reaction]++;
        } else {
          existingPost.reaction = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          existingPost.reaction[reaction]++;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Adding date and reactions
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reaction = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

/**
 * Selectors are functions that know how to extract specific pieces of information
 * @param state State of the store
 * @returns State of posts
 */
export const selectAllPosts = (state: RootState) => state.posts.posts;
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
