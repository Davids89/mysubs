import { Button, useTheme } from "@subtrack/ui-components";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRegistrationSuccessScreen } from "../hooks/useRegistrationSuccessScreen";

export function RegistrationSuccessScreen() {
  const theme = useTheme();
  const { content, goToHome } = useRegistrationSuccessScreen();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: theme.colors.surface.page,
          padding: theme.spacing.xl,
        },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface.raised,
            borderRadius: theme.radius.lg,
            gap: theme.spacing.lg,
            padding: theme.spacing.xl,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.textRole.primary,
              fontSize: theme.typography.title.size,
              fontWeight: theme.typography.title.weight,
            },
          ]}
        >
          {content.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textRole.muted,
              fontSize: theme.typography.bodySmall.size,
            },
          ]}
        >
          {content.subtitle}
        </Text>
        <Button label={content.actionLabel} onPress={goToHome} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {},
  safeArea: {
    flex: 1,
    justifyContent: "center",
  },
  subtitle: {
    lineHeight: 21,
  },
  title: {
    lineHeight: 28,
  },
});
