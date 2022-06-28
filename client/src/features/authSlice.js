import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, fetchUserByUsername, signIn, signOut, signUp } from "../api";

const initialState = {
  user: null,
  searchedUser: null,
  status: 'idle',
  error: null
}

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
  const response = await signOut();
  return response.data;
})

export const getUser = createAsyncThunk('/auth/getUser', async () => {
  const response = await fetchUser();
  return response.data;
})

export const getUserbyUsername = createAsyncThunk('/auth/getUserbyUsername', async (username) => {
  const response = await fetchUserByUsername(username);
  return response.data;
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signInUser: {
      reducer(state,action) {
        state.error = null;
        state.status = 'succeeded';
        state.user = action.payload
      }
    },
    signUpUser: {
      reducer(state,action) {
        state.error = null;
        state.status = 'succeeded';
        state.user = action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log(state.error);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUserbyUsername.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchedUser = action.payload;
      })
      .addCase(getUserbyUsername.rejected, (state, action) => {
        state.error = action.error.message;
        console.log(action.error.message);
      })
  }
})

export const selectUser = (state) => state.auth.user;
export const selectSearchedUser = (state) => state.auth.searchedUser;
export const getUserStatus = (state) => state.auth.status;
export const getUserError = (state) => state.auth.error;

export const { signInUser, signUpUser } = authSlice.actions;

export default authSlice.reducer;