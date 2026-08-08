import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type PressableProps,
  type ViewStyle,
} from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";

type Props = Omit<PressableProps, "style"> & {
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function Button({ disabled, label, style, ...props }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.brand.primary,
          borderRadius: theme.radius.md,
          height: theme.components.button.height,
          paddingHorizontal: theme.components.button.paddingHorizontal,
        },
        disabled ? styles.disabled : undefined,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textRole.inverse,
            fontSize: theme.typography.body.size,
            fontWeight: theme.typography.label.weight,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    lineHeight: 21,
  },
});
