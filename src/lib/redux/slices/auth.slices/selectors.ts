import { ReduxState } from "../../store";

export const selectUser = (state: ReduxState) => state.auth.user;
export const selectSession = (state: ReduxState) => state.auth.session;
