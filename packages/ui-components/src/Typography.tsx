import { Text, type TextProps } from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";
import type { Theme } from "./theme/tokens.js";

type Props = TextProps;

function ThemedText({
  style,
  variant,
  ...props
}: Props & { variant: keyof Theme["typography"] }) {
  const theme = useTheme();
  const { color, size, weight } = theme.typography[variant];

  return (
    <Text
      style={[{ color, fontSize: size, fontWeight: weight }, style]}
      {...props}
    />
  );
}

/** Screen title, 22px medium. */
export function Title(props: Props) {
  return <ThemedText variant="title" {...props} />;
}

/** Section heading, 18px medium. */
export function Subtitle(props: Props) {
  return <ThemedText variant="heading" {...props} />;
}

/** Default copy, 15px regular. */
export function Body(props: Props) {
  return <ThemedText variant="body" {...props} />;
}

/** Muted supporting copy, 11px regular. */
export function Caption(props: Props) {
  return <ThemedText variant="caption" {...props} />;
}
