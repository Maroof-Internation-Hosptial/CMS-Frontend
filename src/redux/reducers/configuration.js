import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filterUsers: [],
};

const configuration = createSlice({
  name: "config",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    filteredUser: (state, action) => {
      state.users = state.filterUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.lastName.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setUsers, filteredUser } = configuration.actions;

export default configuration.reducer;
