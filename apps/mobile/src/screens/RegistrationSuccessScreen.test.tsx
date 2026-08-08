import { render } from "@testing-library/react-native";

import { RegistrationSuccessScreen } from "./RegistrationSuccessScreen";

jest.mock("../hooks/useRegistrationSuccessScreen", () => ({
  useRegistrationSuccessScreen: () => ({
    content: {
      actionLabel: "Ir a mis suscripciones",
      subtitle:
        "Bienvenida a Subtrack, Ana. Ya puedes empezar a gestionar tus suscripciones.",
      title: "Cuenta creada",
    },
    goToHome: jest.fn(),
  }),
}));

describe("RegistrationSuccessScreen", () => {
  it("renders the account created message", () => {
    const { getByText } = render(<RegistrationSuccessScreen />);

    expect(getByText("Cuenta creada")).toBeTruthy();
    expect(
      getByText(
        "Bienvenida a Subtrack, Ana. Ya puedes empezar a gestionar tus suscripciones.",
      ),
    ).toBeTruthy();
    expect(getByText("Ir a mis suscripciones")).toBeTruthy();
  });
});
