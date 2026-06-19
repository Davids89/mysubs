import { render } from "@testing-library/react-native";

import { LoginScreen } from "./LoginScreen";

jest.mock("../hooks/useLoginScreen", () => ({
  useLoginScreen: () => ({
    error: null,
    form: { email: "", password: "" },
    goToRegister: jest.fn(),
    isSubmitting: false,
    submit: jest.fn(),
    updateField: jest.fn(),
  }),
}));

describe("LoginScreen", () => {
  it("renders login fields and register link", () => {
    const { getByText } = render(<LoginScreen />);

    expect(getByText("Inicia sesión")).toBeTruthy();
    expect(getByText("Correo electrónico")).toBeTruthy();
    expect(getByText("Contraseña")).toBeTruthy();
    expect(getByText("Regístrate gratis")).toBeTruthy();
  });
});
