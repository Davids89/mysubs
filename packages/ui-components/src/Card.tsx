import { StyleSheet, View, type ViewProps } from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";

type Props = ViewProps & {
  variant?: "elevated" | "outlined";
};

/** Surface container using the subscription-card padding tokens. */
export function Card({ children, style, variant = "outlined", ...props }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface.raised,
          borderRadius: theme.radius.lg,
          paddingHorizontal: theme.components.subscriptionCard.paddingHorizontal,
          paddingVertical: theme.components.subscriptionCard.paddingVertical,
        },
        variant === "outlined"
          ? {
              borderColor: theme.colors.border.default,
              borderWidth: theme.strokeWidth.default,
            }
          : styles.elevated,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

// The token set has no elevation scale yet, so the shadow is the one place
// this file uses literals. See docs/component-guidelines.md §5.
const styles = StyleSheet.create({
  elevated: {
    elevation: 2,
    shadowColor: "#17211C",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
});
