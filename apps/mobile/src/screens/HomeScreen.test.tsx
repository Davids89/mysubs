import { fireEvent, render, waitFor } from "@testing-library/react-native";

import { HomeScreen } from "./HomeScreen";

const mockSignOut = jest.fn();
const mockReplace = jest.fn();

jest.mock("../auth/AuthSessionProvider", () => ({
  useAuthSession: () => ({ signOut: mockSignOut }),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

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

  it("clears the session and returns to login on sign out", async () => {
    const { getByText } = render(<HomeScreen />);

    fireEvent.press(getByText("Sign out"));

    await waitFor(() => expect(mockSignOut).toHaveBeenCalled());
    expect(mockReplace).toHaveBeenCalledWith("/(auth)/login");
  });
});
