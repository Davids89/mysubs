import {
  lightTheme,
  ThemeProvider,
  useTheme,
} from "@mysubs/ui-components";
import { render } from "@testing-library/react-native";
import { Text } from "react-native";

const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: "#111827",
  },
};

function ThemeProbe() {
  const theme = useTheme();

  return <Text>{theme.colors.primary}</Text>;
}

describe("ThemeProvider", () => {
  it("provides the configured theme to descendants", () => {
    const { getByText } = render(
      <ThemeProvider theme={customTheme}>
        <ThemeProbe />
      </ThemeProvider>,
    );

    expect(getByText("#111827")).toBeTruthy();
  });
});
