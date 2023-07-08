import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/auth-helpers-nextjs";

export interface AuthSliceState {
  user: User | null;
  session: Omit<Session, "user"> | null;
}

export const initialState: AuthSliceState = {
  user: null,
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setSession: (state, action: PayloadAction<Omit<Session, "user">>) => {
      state.session = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});
