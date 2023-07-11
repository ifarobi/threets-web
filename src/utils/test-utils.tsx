import { authSlice } from "@/lib/redux/slices/auth.slices/slice";
import { render } from "@testing-library/react";
import { ReduxState, ReduxStore } from "@/lib/redux/store";
import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { PropsWithChildren, ReactElement } from "react";
import { threetSlice } from "@/lib/redux/slices/threet.slices/slice";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<ReduxState>;
  store?: ReduxStore;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {
      auth: {
        user: null,
      },
      threet: {
        posts: [],
        loading: false,
      },
    },
    store = configureStore({
      reducer: { auth: authSlice.reducer, threet: threetSlice.reducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
