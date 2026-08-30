import { fireEvent, render } from "@testing-library/react-native";

import { LoginScreen } from "./LoginScreen";

const mockForgotPassword = jest.fn();

jest.mock("../hooks/useLoginScreen", () => ({
  useLoginScreen: () => ({
    error: null,
    form: { email: "", password: "" },
    forgotPassword: mockForgotPassword,
    goToRegister: jest.fn(),
    isSubmitting: false,
    notice: null,
    submit: jest.fn(),
    updateField: jest.fn(),
  }),
}));

describe("LoginScreen", () => {
  it("renders login fields and register link", () => {
    const { getAllByText, getByText } = render(<LoginScreen />);

    // Title and primary button share the "Sign in" label.
    expect(getAllByText("Sign in")).toHaveLength(2);
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Password")).toBeTruthy();
    expect(getByText("Sign up for free")).toBeTruthy();
  });

  it("exposes the forgot password entry point", () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText("Forgot your password?"));

    expect(mockForgotPassword).toHaveBeenCalled();
  });
});
