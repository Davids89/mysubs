import { render } from "@testing-library/react-native";

import { HomeScreen } from "./HomeScreen";

describe("HomeScreen", () => {
  it("renders the subscription list foundation", () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText("My subscriptions")).toBeTruthy();
    expect(getByText("0 active subscriptions")).toBeTruthy();
    expect(getByText("Add your first subscription")).toBeTruthy();
    expect(
      getByText("Add your first subscription to start managing them."),
    ).toBeTruthy();
    expect(getByText("Add subscription")).toBeTruthy();
  });
});
