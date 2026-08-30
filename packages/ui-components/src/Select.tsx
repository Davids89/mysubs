import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Modal } from "./Modal.js";
import { useTheme } from "./theme/ThemeProvider.js";

// ponytail: the options render in the shared Modal instead of the native
// pickers, so iOS and Android behave identically without a picker dependency.

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
};

/** Field that opens a modal list of options. */
export function Select({
  label,
  onChange,
  options,
  placeholder = "Select an option",
  value,
}: Props) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  const choose = (option: SelectOption): void => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: theme.colors.textRole.secondary,
          fontSize: theme.typography.label.size,
          fontWeight: theme.typography.label.weight,
        }}
      >
        {label}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setIsOpen(true)}
        style={[
          styles.field,
          {
            backgroundColor: theme.colors.surface.subtle,
            borderColor: theme.colors.border.default,
            borderRadius: theme.radius.md,
            borderWidth: theme.strokeWidth.default,
            height: theme.components.input.height,
            paddingHorizontal: theme.components.input.paddingHorizontal,
          },
        ]}
      >
        <Text
          style={{
            color: selected
              ? theme.colors.textRole.primary
              : theme.colors.textRole.muted,
            fontSize: theme.typography.bodySmall.size,
          }}
        >
          {selected ? selected.label : placeholder}
        </Text>
      </Pressable>
      <Modal onClose={() => setIsOpen(false)} title={label} visible={isOpen}>
        {options.map((option) => (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: option.value === value }}
            key={option.value}
            onPress={() => choose(option)}
            style={{ paddingVertical: theme.spacing.sm }}
          >
            <Text
              style={{
                color:
                  option.value === value
                    ? theme.colors.brand.dark
                    : theme.colors.textRole.primary,
                fontSize: theme.typography.body.size,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  field: {
    justifyContent: "center",
  },
});
