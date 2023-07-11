import { getSupabaseAnonClient } from "@/lib/supabase";
import { createReduxAsyncThunk } from "../../creteReduxAsyncThunk";

type UserCreds = {
  email: string;
  password: string;
};

type UserSignUp = UserCreds & {
  firstName: string;
  lastName: string;
};

export const signIn = createReduxAsyncThunk(
  "auth/signIn",
  async function ({ email, password }: UserCreds) {
    const supabase = getSupabaseAnonClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Promise.reject(error.message);
    }

    return data;
  }
);

export const signOut = createReduxAsyncThunk("auth/signOut", async function () {
  const supabase = getSupabaseAnonClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return Promise.reject(error.message);
  }

  return null;
});

export const signUp = createReduxAsyncThunk(
  "auth/signUp",
  async function ({ email, password, firstName, lastName }: UserSignUp) {
    const supabase = getSupabaseAnonClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
        emailRedirectTo: "http://localhost:3000/auth/verify",
      },
    });

    if (error) {
      return Promise.reject(error.message);
    }

    return data;
  }
);
