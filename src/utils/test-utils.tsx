import { authSlice } from "@/lib/redux/slices/auth.slices/slice";
import { threetSlice } from "@/lib/redux/slices/threet.slices/slice";
import { ReduxState, ReduxStore } from "@/lib/redux/store";
import { ApiRequest } from "@/types/api.types";
import { PreloadedState, configureStore } from "@reduxjs/toolkit";
import { RenderOptions, render } from "@testing-library/react";
import { RequestMethod, createRequest } from "node-mocks-http";
import { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";

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

export function createMockRequest({
  method = "GET",
  query = {},
  body = {},
  headers = {},
}: {
  method?: RequestMethod;
  query?: { [key: string]: string };
  body?: { [key: string]: string | number };
  headers?: { [key: string]: string };
}) {
  const req = createRequest({ method, query, body, headers }) as ApiRequest;

  const res: any = {
    status: jest.fn(() => res),
    json: jest.fn(() => res),
    end: jest.fn(),
  };

  const next = jest.fn() as any;

  return { req, res, next };
}
