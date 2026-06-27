import { Button, TextField, useTheme } from "@subtrack/ui-components";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AuthScreenLayout } from "../components/AuthScreenLayout";
import { useRegisterScreen } from "../hooks/useRegisterScreen";

export function RegisterScreen() {
  const theme = useTheme();
  const {
    errors,
    form,
    goBack,
    goToLogin,
    isSubmitting,
    submit,
    updateField,
  } = useRegisterScreen();

  return (
    <AuthScreenLayout subtitle="Solo te llevará un momento" title="Crea tu cuenta">
      <Pressable onPress={goBack}>
        <Text
          style={[
            styles.link,
            {
              color: theme.colors.brand.dark,
              fontWeight: theme.typography.label.weight,
            },
          ]}
        >
          Volver
        </Text>
      </Pressable>
      <TextField
        error={errors.firstName}
        label="Nombre"
        onChangeText={(value) => updateField("firstName", value)}
        placeholder="Ana"
        value={form.firstName}
      />
      <TextField
        error={errors.lastName}
        label="Apellido"
        onChangeText={(value) => updateField("lastName", value)}
        placeholder="García"
        value={form.lastName}
      />
      <TextField
        autoCapitalize="none"
        error={errors.email}
        keyboardType="email-address"
        label="Correo electrónico"
        onChangeText={(value) => updateField("email", value)}
        placeholder="ana@correo.com"
        value={form.email}
      />
      <TextField
        error={errors.password}
        label="Contraseña"
        onChangeText={(value) => updateField("password", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.password}
      />
      <TextField
        error={errors.confirmPassword}
        label="Confirmar contraseña"
        onChangeText={(value) => updateField("confirmPassword", value)}
        placeholder="••••••••"
        secureTextEntry
        value={form.confirmPassword}
      />
      <Text style={{ color: theme.colors.mutedText }}>
        Al registrarte aceptas los términos de uso y la política de privacidad
      </Text>
      {errors.form ? (
        <Text style={{ color: theme.colors.semantic.danger.text }}>
          {errors.form}
        </Text>
      ) : null}
      <Button disabled={isSubmitting} label="Crear cuenta" onPress={submit} />
      <View style={styles.footer}>
        <Text style={{ color: theme.colors.mutedText }}>¿Ya tienes cuenta?</Text>
        <Pressable onPress={goToLogin}>
          <Text
            style={[
              styles.link,
              {
                color: theme.colors.brand.dark,
                fontWeight: theme.typography.label.weight,
              },
            ]}
          >
            Inicia sesión
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
  link: {},
});
