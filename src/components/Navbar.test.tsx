import userMock from "@/mocks/users";
import { renderWithProviders } from "@/utils/test-utils";
import Navbar from "./Navbar";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Navbar", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(<Navbar />, {
      preloadedState: {
        auth: {
          user: userMock[0],
        },
        threet: {
          posts: [],
          loading: false,
        },
      },
    });

    expect(getByText(userMock[0].email)).toBeInTheDocument();
  });
});
