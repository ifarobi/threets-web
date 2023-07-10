import { Threet } from "@/types/database.aliases";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addThreet, deleteThreet, editThreet, fetchThreets } from "./thunks";

export interface ThreetSliceState {
  posts: Array<Threet>;
  loading: boolean;
}

const initialState: ThreetSliceState = {
  posts: [],
  loading: false,
};

export const threetSlice = createSlice({
  name: "threet",
  initialState,
  reducers: {
    setThreets: (state, action: PayloadAction<Array<Threet>>) => {
      state.posts = action.payload;
    },
    deleteThreet: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(
        (threet) => threet.id !== action.payload
      );
    },
    addThreet: (state, action: PayloadAction<Threet>) => {
      state.posts.unshift(action.payload);
    },
    editThreet: (state, action: PayloadAction<Threet>) => {
      state.posts = state.posts.map((threet) =>
        threet.id === action.payload.id ? action.payload : threet
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThreets.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchThreets.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteThreet.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (threet) => threet.id !== action.payload
        );
      })
      .addCase(editThreet.fulfilled, (state, action) => {
        state.posts = state.posts.map((threet) =>
          threet.id === action.payload.id ? action.payload : threet
        );
      });
  },
});
