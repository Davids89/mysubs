import { render } from "@testing-library/react-native";

import { HomeScreen } from "./HomeScreen";

describe("HomeScreen", () => {
  it("renders the mobile foundation messaging", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("MySubs mobile")).toBeTruthy();
    expect(
      getByText("Track shared subscriptions with less friction"),
    ).toBeTruthy();
    expect(getByText("Auth setup comes next")).toBeTruthy();
  });
});
