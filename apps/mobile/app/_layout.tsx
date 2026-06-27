import "react-native-gesture-handler";

import { ThemeProvider } from "@mysubs/ui-components";
import { Stack } from "expo-router";

import { AuthSessionProvider } from "../src/auth/AuthSessionProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthSessionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthSessionProvider>
    </ThemeProvider>
  );
}
