import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRootState, LoginState, User } from "../../types/login.types";

const initialState: LoginState = {
  isAuthenticated: false,
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Set the user info from the action payload
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null; // Clear the user info on logout
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.isAuthenticated) {
        state.user = action.payload; // Update the user info if authenticated
      }
    },
  },
});

export const { login, logout, updateUser } = loginSlice.actions;
export const selectAllLoginStates = (state: LoginRootState) => state.login;
export default loginSlice.reducer;
