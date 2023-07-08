import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReduxDispatch, ReduxState } from "./store";

export const createReduxAsyncThunk = createAsyncThunk.withTypes<{
  state: ReduxState;
  dispatch: ReduxDispatch;
  rejectValue: string;
}>();
