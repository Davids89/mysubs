import { render } from "@testing-library/react-native";

import { RegistrationSuccessScreen } from "./RegistrationSuccessScreen";

jest.mock("../hooks/useRegistrationSuccessScreen", () => ({
  useRegistrationSuccessScreen: () => ({
    displayName: "Ana",
    goToHome: jest.fn(),
  }),
}));

describe("RegistrationSuccessScreen", () => {
  it("renders the account created message", () => {
    const { getByText } = render(<RegistrationSuccessScreen />);

    expect(getByText("¡Cuenta creada!")).toBeTruthy();
    expect(
      getByText(
        "Bienvenida a Subtrack, Ana. Ya puedes empezar a gestionar tus suscripciones.",
      ),
    ).toBeTruthy();
    expect(getByText("Ir a mis suscripciones")).toBeTruthy();
  });
});
