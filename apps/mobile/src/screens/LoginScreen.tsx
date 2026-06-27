import { Button, TextField, useTheme } from "@mysubs/ui-components";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AuthScreenLayout } from "../components/AuthScreenLayout";
import { useLoginScreen } from "../hooks/useLoginScreen";

export function LoginScreen() {
  const theme = useTheme();
  const { error, form, goToRegister, isSubmitting, submit, updateField } =
    useLoginScreen();

  return (
    <AuthScreenLayout
      subtitle="Gestiona tus suscripciones"
      title="Inicia sesión"
    >
      <TextField
        autoCapitalize="none"
        keyboardType="email-address"
        label="Correo electrónico"
        onChangeText={(value) => updateField("email", value)}
        placeholder="tu@correo.com"
        value={form.email}
      />
      <TextField
        label="Contraseña"
        onChangeText={(value) => updateField("password", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.password}
      />
      {error ? <Text style={{ color: theme.colors.danger }}>{error}</Text> : null}
      <Button disabled={isSubmitting} label="Entrar" onPress={submit} />
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.mutedText }}>¿No tienes cuenta?</Text>
        <Pressable onPress={goToRegister}>
          <Text style={[styles.link, { color: theme.colors.primary }]}>
            Regístrate gratis
          </Text>
        </Pressable>
      </View>
    </AuthScreenLayout>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: "center",
    gap: 4,
  },
  link: {
    fontWeight: "700",
  },
});
