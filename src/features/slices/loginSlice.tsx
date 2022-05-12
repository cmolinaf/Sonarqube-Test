import { createSlice } from "@reduxjs/toolkit";

interface state {
  isLoading: boolean;
  loggedIn: boolean;
  users: Array<User> /*
    error: boolean,
    user: string, 
    password: string */;
}

interface User {
  username: string;
  password: string;
}

const initialLoadingState: state = {
  isLoading: false,
  loggedIn: false,
  users: [],
  /*
    error: false,
    user: '', 
    password: '',  */
};

export const loginLoadingSlice = createSlice({
  name: "loginLoading",
  initialState: initialLoadingState,
  reducers: {
    toggleLoading: (state: state) => {
      state.isLoading == true ? false : true;
    },
    toggleLoggedIn: (state: state) => {
      state.loggedIn == false ? true : false;
    },
  },
});

export const selectorLoggedInState = (state: state) => state.loggedIn;

export const selectorLoadingState = (state: state) => state.isLoading;

export const { toggleLoading, toggleLoggedIn } = loginLoadingSlice.actions;

export default loginLoadingSlice.reducer;
