import { authSlice } from "./auth.slices/slice";
import { threetSlice } from "./threet.slices/slice";

export const reducer = {
  threet: threetSlice.reducer,
  auth: authSlice.reducer,
};
