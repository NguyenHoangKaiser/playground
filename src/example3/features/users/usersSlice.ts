import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/example3/store/store";

export interface IUser {
  id: string;
  name: string;
}

export type UsersState = IUser[];

const initialState: UsersState = [
  { id: "12", name: "Hoang" },
  { id: "13", name: "Nam" },
  { id: "24", name: "Huy" },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    // postAdded: {
    //   reducer(state, action: PayloadAction<IPost>) {
    //     state.push(action.payload);
    //   },
    //   prepare({ title, content }: { title: string; content: string }) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content,
    //       },
    //     };
    //   },
    // },
  },
});

/**
 * Selectors are functions that know how to extract specific pieces of information
 * @param state State of the store
 * @returns State of posts
 */
export const selectAllUsers = (state: RootState) => state.users;

// export const { postAdded } = usersSlice.actions;

export default usersSlice.reducer;
