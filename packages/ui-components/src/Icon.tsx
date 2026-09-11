import { View } from "react-native";
import type { ReactNode } from "react";

import { useTheme } from "./theme/ThemeProvider.js";

// ponytail: no icon package is installed yet, so Icon only normalizes the size
// and color from the token scale and defers the glyph to `render`. Swap `render`
// for Tabler icon names once an icon package lands.
const ICON_SIZES = {
  inline: 16,
  list: 18,
  max: 24,
  nav: 22,
} as const;

type Props = {
  color?: string;
  /** Set for meaningful icons; omit to hide decorative ones from screen readers. */
  label?: string;
  render: (params: { color: string; size: number }) => ReactNode;
  size?: keyof typeof ICON_SIZES;
};

/** Renders an icon glyph at a token size with a consistent color. */
export function Icon({ color, label, render, size = "list" }: Props) {
  const theme = useTheme();
  const glyph = {
    color: color ?? theme.colors.textRole.secondary,
    size: ICON_SIZES[size],
  };

  return (
    <View
      accessibilityElementsHidden={label === undefined}
      accessibilityLabel={label}
      accessibilityRole={label === undefined ? undefined : "image"}
      importantForAccessibility={label === undefined ? "no-hide-descendants" : "yes"}
      style={{
        alignItems: "center",
        height: glyph.size,
        justifyContent: "center",
        width: glyph.size,
      }}
    >
      {render(glyph)}
    </View>
  );
}
