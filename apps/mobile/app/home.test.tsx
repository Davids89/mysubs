import { render } from "@testing-library/react-native";

import HomeRoute from "./home";

const mockSession = jest.fn();

jest.mock("../src/auth/AuthSessionProvider", () => ({
  useAuthSession: () => mockSession(),
}));

jest.mock("expo-router", () => ({
  Redirect: ({ href }: { href: string }) => `redirect:${href}`,
}));

jest.mock("../src/screens/HomeScreen", () => ({
  HomeScreen: () => "home-screen",
}));

describe("HomeRoute", () => {
  it("renders nothing while the session is loading", () => {
    mockSession.mockReturnValue({ isLoading: true, token: null });

    expect(render(<HomeRoute />).toJSON()).toBeNull();
  });

  it("redirects to login when there is no token", () => {
    mockSession.mockReturnValue({ isLoading: false, token: null });

    expect(render(<HomeRoute />).toJSON()).toBe("redirect:/(auth)/login");
  });

  it("renders the home screen when a token is present", () => {
    mockSession.mockReturnValue({ isLoading: false, token: "token" });

    expect(render(<HomeRoute />).toJSON()).toBe("home-screen");
  });
});
