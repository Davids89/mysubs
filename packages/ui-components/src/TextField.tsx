import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { useTheme } from "./theme/ThemeProvider.js";

type Props = TextInputProps & {
  error?: string;
  label: string;
};

export function TextField({ error, label, style, ...props }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textRole.secondary,
            fontSize: theme.typography.label.size,
            fontWeight: theme.typography.label.weight,
          },
        ]}
      >
        {label}
      </Text>
      <TextInput
        placeholderTextColor={theme.colors.textRole.muted}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderColor: error
              ? theme.colors.border.error
              : theme.colors.border.default,
            borderRadius: theme.radius.md,
            borderWidth: theme.strokeWidth.default,
            color: theme.colors.textRole.primary,
            fontSize: theme.typography.bodySmall.size,
            height: theme.components.input.height,
            paddingHorizontal: theme.components.input.paddingHorizontal,
          },
          style,
        ]}
        {...props}
      />
      {error ? (
        <Text
          style={[
            styles.error,
            {
              color: theme.colors.semantic.danger.text,
              fontSize: theme.typography.bodySmall.size,
            },
          ]}
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
  error: {
    lineHeight: 21,
  },
  input: {
    paddingVertical: 0,
  },
  label: {
    lineHeight: 14,
  },
});
