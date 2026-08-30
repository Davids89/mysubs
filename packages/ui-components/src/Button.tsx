import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { ReactNode } from "react";

import { Spinner } from "./Spinner.js";
import { useTheme } from "./theme/ThemeProvider.js";
import type { Theme } from "./theme/tokens.js";

type ButtonSize = "large" | "medium" | "small";
type ButtonVariant = "danger" | "ghost" | "primary" | "secondary";

type Props = Omit<PressableProps, "style"> & {
  icon?: ReactNode;
  label: string;
  loading?: boolean;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
};

export function Button({
  disabled,
  icon,
  label,
  loading = false,
  size = "medium",
  style,
  variant = "primary",
  ...props
}: Props) {
  const theme = useTheme();
  const { fontSize, ...metrics } = resolveSize(theme, size);
  const { color, ...toneStyle } = resolveVariant(theme, variant);
  const isInactive = disabled === true || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isInactive }}
      disabled={isInactive}
      style={[
        styles.button,
        {
          ...toneStyle,
          ...metrics,
          borderRadius: theme.radius.md,
          gap: theme.spacing.sm,
        },
        variant === "ghost" ? styles.ghost : undefined,
        isInactive ? styles.disabled : undefined,
        style,
      ]}
      {...props}
    >
      {loading ? <Spinner color={color} size="small" /> : icon}
      <Text
        style={{
          color,
          fontSize,
          fontWeight: theme.typography.label.weight,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function resolveSize(theme: Theme, size: ButtonSize) {
  const { button } = theme.components;

  if (size === "small") {
    return {
      fontSize: theme.typography.bodySmall.size,
      height: button.smallHeight,
      paddingHorizontal: button.smallPaddingHorizontal,
    };
  }

  if (size === "large") {
    return {
      fontSize: theme.typography.body.size,
      height: button.largeHeight,
      paddingHorizontal: button.largePaddingHorizontal,
    };
  }

  return {
    fontSize: theme.typography.body.size,
    height: button.height,
    paddingHorizontal: button.paddingHorizontal,
  };
}

function resolveVariant(theme: Theme, variant: ButtonVariant) {
  const { colors, strokeWidth } = theme;

  if (variant === "secondary") {
    return {
      backgroundColor: "transparent",
      borderColor: colors.border.strong,
      borderWidth: strokeWidth.default,
      color: colors.textRole.primary,
    };
  }

  if (variant === "danger") {
    return {
      backgroundColor: "transparent",
      borderColor: colors.border.error,
      borderWidth: strokeWidth.default,
      color: colors.border.error,
    };
  }

  if (variant === "ghost") {
    return {
      backgroundColor: "transparent",
      borderColor: "transparent",
      borderWidth: 0,
      color: colors.brand.dark,
    };
  }

  return {
    backgroundColor: colors.brand.primary,
    borderColor: "transparent",
    borderWidth: 0,
    color: colors.textRole.inverse,
  };
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  ghost: {
    paddingHorizontal: 0,
  },
});
