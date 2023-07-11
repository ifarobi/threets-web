import { renderWithProviders } from "@/utils/test-utils";
import SigninPage from "./signin";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("SigninPage", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<SigninPage />, {
      preloadedState: {
        auth: {
          user: null,
        },
        threet: {
          posts: [],
          loading: false,
        },
      },
    });

    expect(getByText("Login")).toBeInTheDocument();
  });
});
