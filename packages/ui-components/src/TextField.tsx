import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import type { ReactNode } from "react";

import { useTheme } from "./theme/ThemeProvider.js";

type Props = Omit<TextInputProps, "style"> & {
  error?: string;
  /** Rendered inside the field, before the input. */
  icon?: ReactNode;
  label: string;
  style?: StyleProp<ViewStyle>;
};

export function TextField({ error, icon, label, style, ...props }: Props) {
  const theme = useTheme();
  const isDisabled = props.editable === false;

  return (
    <View style={[styles.container, style]}>
      <Text
        style={{
          color: theme.colors.textRole.secondary,
          fontSize: theme.typography.label.size,
          fontWeight: theme.typography.label.weight,
        }}
      >
        {label}
      </Text>
      <View
        style={[
          styles.field,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderColor: error
              ? theme.colors.border.error
              : theme.colors.border.default,
            borderRadius: theme.radius.md,
            borderWidth: theme.strokeWidth.default,
            gap: theme.spacing.sm,
            height: theme.components.input.height,
            paddingHorizontal: theme.components.input.paddingHorizontal,
          },
          isDisabled ? styles.disabled : undefined,
        ]}
      >
        {icon}
        <TextInput
          placeholderTextColor={theme.colors.textRole.muted}
          style={[
            styles.input,
            {
              color: theme.colors.textRole.primary,
              fontSize: theme.typography.bodySmall.size,
            },
          ]}
          {...props}
        />
      </View>
      {error ? (
        <Text
          style={{
            color: theme.colors.semantic.danger.text,
            fontSize: theme.typography.bodySmall.size,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  disabled: {
    opacity: 0.6,
  },
  field: {
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
});
