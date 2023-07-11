import ThreetItem from "@/components/ThreetItem";
import { renderWithProviders } from "@/utils/test-utils";
import userMock from "@/mocks/users";
import threetsMock from "@/mocks/threets";

const mockedThreet = {
  id: 1,
  content: "Hello World",
  created_at: "2021-01-01T00:00:00.000Z",
  user: "123",
};

describe("ThreetItem", () => {
  it("renders correctly", () => {
    const { getByText } = renderWithProviders(
      <ThreetItem threet={mockedThreet} />,
      {
        preloadedState: {
          auth: {
            user: userMock[0],
          },
          threet: {
            posts: threetsMock,
            loading: false,
          },
        },
      }
    );
    expect(getByText(mockedThreet.content)).toBeInTheDocument();
  });
});
