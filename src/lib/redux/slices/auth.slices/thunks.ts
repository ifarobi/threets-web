import fetcher from "@/lib/axios";
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
    const { data } = await fetcher.post("/api/auth/signin", {
      email,
      password,
    });

    const { token, user } = data;

    localStorage.setItem("token", token);

    return user;
  }
);

export const signOut = createReduxAsyncThunk("auth/signOut", async function () {
  const { data } = await fetcher.post("/api/auth/signout");

  localStorage.removeItem("token");

  return data;
});

export const signUp = createReduxAsyncThunk(
  "auth/signUp",
  async function ({ email, password, firstName, lastName }: UserSignUp) {
    const { data } = await fetcher.post("/api/auth/signup", {
      email,
      password,
      firstName,
      lastName,
    });

    const { token, user } = data;

    localStorage.setItem("token", token);

    return user;
  }
);

export const fetchUser = createReduxAsyncThunk(
  "auth/fetchUser",
  async function () {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const { data } = await fetcher.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);
