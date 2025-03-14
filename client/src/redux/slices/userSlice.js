import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    newUser: null,
    isFetching: false,
    error: false,
  },

  reducers: {
    // Generic function for setting loading state
    requestStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    requestFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Login
    userLogin: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },

    //Logout
    userLogout: (state) => {
      state.isFetching = false;
      state.currentUser = null;
    },

    //New user registration
    registerUser: (state, action) => {
      state.isFetching = false;
      state.newUser = action.payload;
    },

    //Get all users
    getAllUsers: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },

    //get single user
    getSingleUser: (state, action) => {
      state.isFetching = false;
      state.currentUser = {
        ...action.payload,
        accessToken: state.currentUser?.accessToken,
      };
    },

    //Delete a user
    deleteUser: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },

    //Update a user
    updateUser: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },

    //Add a user
    addUser: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
  },
});

export const {
  requestStart,
  requestFailure,
  userLogin,
  userLogout,
  registerUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addUser,
} = userSlice.actions;

export default userSlice.reducer;
