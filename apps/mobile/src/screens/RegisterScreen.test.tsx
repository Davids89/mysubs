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

    expect(getByText("Crea tu cuenta")).toBeTruthy();
    expect(getByText("Nombre")).toBeTruthy();
    expect(getByText("Apellido")).toBeTruthy();
    expect(getByText("Correo electrónico")).toBeTruthy();
    expect(getByText("Confirmar contraseña")).toBeTruthy();
  });
});
