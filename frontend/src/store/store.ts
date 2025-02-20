import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice"; // Import the login reducer
import { loginAPI } from "./apis/loginAPI";
import { dashboardAPI } from "./apis/dashboardAPI";
import { queueListAPI } from "./apis/queueListAPI";
import { queueDetailsAPI } from "./apis/queueDetailAPI";
import { testConnectionAPI } from "./apis/testConnectionAPI";

const store = configureStore({
  reducer: {
    login: loginReducer, // Add the login reducer to the store
    [loginAPI.reducerPath]: loginAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
    [queueListAPI.reducerPath]: queueListAPI.reducer,
    [queueDetailsAPI.reducerPath]: queueDetailsAPI.reducer,
    [testConnectionAPI.reducerPath]: testConnectionAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginAPI.middleware)
      .concat(dashboardAPI.middleware)
      .concat(queueListAPI.middleware)
      .concat(queueDetailsAPI.middleware)
      .concat(testConnectionAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
