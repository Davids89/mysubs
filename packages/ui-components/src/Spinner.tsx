import { ActivityIndicator } from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";

const SPINNER_SIZES = {
  large: 36,
  medium: 24,
  small: 16,
} as const;

type Props = {
  color?: string;
  size?: keyof typeof SPINNER_SIZES;
};

/** Loading indicator; defaults to the brand color. */
export function Spinner({ color, size = "medium" }: Props) {
  const theme = useTheme();

  return (
    <ActivityIndicator
      accessibilityRole="progressbar"
      color={color ?? theme.colors.brand.primary}
      size={SPINNER_SIZES[size]}
    />
  );
}
