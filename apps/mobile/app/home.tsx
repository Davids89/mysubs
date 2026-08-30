import { Redirect } from "expo-router";

import { useAuthSession } from "../src/auth/AuthSessionProvider";
import { HomeScreen } from "../src/screens/HomeScreen";

export default function HomeRoute() {
  const { isLoading, token } = useAuthSession();

  if (isLoading) {
    return null;
  }

  return token ? <HomeScreen /> : <Redirect href="/(auth)/login" />;
}
