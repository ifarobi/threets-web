import { getSupabaseAnonClient } from "@/lib/supabase";
import { Threet } from "@/types/database.aliases";
import { createReduxAsyncThunk } from "../../creteReduxAsyncThunk";

export const fetchThreets = createReduxAsyncThunk(
  "threet/fetchThreets",
  async function () {
    try {
      const supabase = getSupabaseAnonClient();

      const { data, error } = await supabase
        .from("threet_post")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return Promise.reject(error.message);
      }

      return data;
    } catch (e) {
      console.log(e);
      const error = e as Error;
      return Promise.reject(error.message);
    }
  }
);

export const deleteThreet = createReduxAsyncThunk(
  "threet/deleteThreet",
  async function (id: Threet["id"]) {
    try {
      const supabase = getSupabaseAnonClient();

      const { error } = await supabase
        .from("threet_post")
        .delete()
        .match({ id });

      if (error) {
        return Promise.reject(error.message);
      }

      return id;
    } catch (e) {
      const error = e as Error;
      return Promise.reject(error.message);
    }
  }
);

export const addThreet = createReduxAsyncThunk(
  "threet/addThreet",
  async function (threet: Pick<Threet, "user" | "content">) {
    console.log("addThreet", threet);
    try {
      const supabase = getSupabaseAnonClient();

      console.log(threet);

      const { data, error } = await supabase.from("threet_post").insert({
        ...threet,
      });

      if (error) {
        return Promise.reject(error.message);
      }

      return data;
    } catch (e) {
      const error = e as Error;
      return Promise.reject(error.message);
    }
  }
);

export const editThreet = createReduxAsyncThunk(
  "threet/editThreet",
  async function (threet: Pick<Threet, "id" | "content">) {
    try {
      const supabase = getSupabaseAnonClient();

      const { data, error } = await supabase
        .from("threet_post")
        .update({ content: threet.content })
        .match({ id: threet.id })
        .select("*")
        .single();

      if (error) {
        return Promise.reject(error.message);
      }

      if (!data) {
        return Promise.reject("No data");
      }

      return data;
    } catch (e) {
      const error = e as Error;
      return Promise.reject(error.message);
    }
  }
);
