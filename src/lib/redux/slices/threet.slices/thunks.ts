import fetcher from "@/lib/axios";
import { Threet } from "@/types/api.types";
import { createReduxAsyncThunk } from "../../creteReduxAsyncThunk";

export const fetchThreets = createReduxAsyncThunk(
  "threet/fetchThreets",
  async function () {
    const { data } = await fetcher.get("/api/threets");

    return data;
  }
);

export const deleteThreet = createReduxAsyncThunk(
  "threet/deleteThreet",
  async function (id: Threet["id"]) {
    const { data } = await fetcher.delete("/api/threets/delete", {
      data: {
        id,
      },
    });

    return data.id;
  }
);

export const addThreet = createReduxAsyncThunk(
  "threet/addThreet",
  async function (threet: Pick<Threet, "user" | "content">) {
    const { data } = await fetcher.post("/api/threets/post", {
      ...threet,
    });

    return data;
  }
);

export const editThreet = createReduxAsyncThunk(
  "threet/editThreet",
  async function (threet: Pick<Threet, "id" | "content">) {
    const { data } = await fetcher.patch("/api/threets/update", {
      ...threet,
    });

    return data;
  }
);
