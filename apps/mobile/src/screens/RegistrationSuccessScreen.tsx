import { Button, useTheme } from "@mysubs/ui-components";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRegistrationSuccessScreen } from "../hooks/useRegistrationSuccessScreen";

export function RegistrationSuccessScreen() {
  const theme = useTheme();
  const { displayName, goToHome } = useRegistrationSuccessScreen();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          ¡Cuenta creada!
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
          Bienvenida a Subtrack, {displayName}. Ya puedes empezar a gestionar
          tus suscripciones.
        </Text>
        <Button label="Ir a mis suscripciones" onPress={goToHome} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    gap: 20,
    padding: 24,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});
