import { render } from "@testing-library/react-native";

import { RegistrationSuccessScreen } from "./RegistrationSuccessScreen";

jest.mock("../hooks/useRegistrationSuccessScreen", () => ({
  useRegistrationSuccessScreen: () => ({
    content: {
      actionLabel: "Go to my subscriptions",
      subtitle:
        "Welcome to Subtrack, Ana. You can start managing your subscriptions now.",
      title: "Account created",
    },
    goToHome: jest.fn(),
  }),
}));

describe("RegistrationSuccessScreen", () => {
  it("renders the account created message", () => {
    const { getByText } = render(<RegistrationSuccessScreen />);

    expect(getByText("Account created")).toBeTruthy();
    expect(
      getByText(
        "Welcome to Subtrack, Ana. You can start managing your subscriptions now.",
      ),
    ).toBeTruthy();
    expect(getByText("Go to my subscriptions")).toBeTruthy();
  });
});
