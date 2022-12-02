import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/example3/store/store";
import axios from "axios";

export interface IUser {
  id: string;
  name: string;
}

const USERS_URL = "http://localhost:3500/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get<IUser[]>(USERS_URL);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Error when get users: ${error.message}`);
      throw {
        message: `Failed to fetch users, ${error.message}`,
        status: 500,
      };
    } else {
      console.log("unexpected error: ", error);
      throw {
        message: `Failed to fetch users: ${error}`,
        status: 500,
      };
    }
  }
});

export type UsersState = IUser[];

const initialState: UsersState = [];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
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
