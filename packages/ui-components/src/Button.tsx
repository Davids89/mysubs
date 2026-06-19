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
        { backgroundColor: theme.colors.primary },
        disabled ? styles.disabled : undefined,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.label, { color: theme.colors.primaryText }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
  },
});
