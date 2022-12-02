import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/example3/store/store";

export interface IPost {
  id: string;
  title: string;
  content: string;
  userId: string;
}

export type PostsState = IPost[];

const initialState: PostsState = [
  {
    id: "0",
    title: "Hello World",
    content: "Welcome to learning Redux!",
    userId: "24",
  },
  { id: "1", title: "Foo", content: "Bar", userId: "12" },
  { id: "2", title: "Baz", content: "Qux", userId: "13" },
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
          },
        };
      },
    },
  },
});

/**
 * Selectors are functions that know how to extract specific pieces of information
 * @param state State of the store
 * @returns State of posts
 */
export const selectAllPosts = (state: RootState) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
