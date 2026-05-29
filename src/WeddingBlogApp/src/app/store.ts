import { configureStore } from "@reduxjs/toolkit";
import { weddingBlogApi } from "../services/weddingBlogApi";

export const store = configureStore({
  reducer: {
    [weddingBlogApi.reducerPath]: weddingBlogApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weddingBlogApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
