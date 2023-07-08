import { ReduxState } from "../../store";

export const selectThreets = (state: ReduxState) => state.threet.posts;
