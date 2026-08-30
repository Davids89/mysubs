import { render } from "@testing-library/react-native";

import { RegisterScreen } from "./RegisterScreen";

jest.mock("../hooks/useRegisterScreen", () => ({
  useRegisterScreen: () => ({
    errors: {},
    form: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    goBack: jest.fn(),
    goToLogin: jest.fn(),
    isSubmitting: false,
    submit: jest.fn(),
    updateField: jest.fn(),
  }),
}));

describe("RegisterScreen", () => {
  it("renders the registration form fields", () => {
    const { getByText } = render(<RegisterScreen />);

    expect(getByText("Create your account")).toBeTruthy();
    expect(getByText("First name")).toBeTruthy();
    expect(getByText("Last name")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("Confirm password")).toBeTruthy();
  });
});
