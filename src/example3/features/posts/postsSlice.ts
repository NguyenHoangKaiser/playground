import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/example3/store/store";
import { sub } from "date-fns";
import { IPost, TReaction } from "../types";

const day = () => {
  return sub(new Date(), { minutes: 10 }).toISOString();
};

export type PostsState = IPost[];

const initialState: PostsState = [
  {
    id: "0",
    title: "Hello World",
    content: "Welcome to learning Redux!",
    userId: "24",
    date: day(),
    reaction: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "1",
    title: "Foo",
    content: "Bar",
    userId: "12",
    date: day(),
    reaction: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
  },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        state.push(action.payload);
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
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reaction[reaction]++;
      }
    },
  },
});

/**
 * Selectors are functions that know how to extract specific pieces of information
 * @param state State of the store
 * @returns State of posts
 */
export const selectAllPosts = (state: RootState) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
