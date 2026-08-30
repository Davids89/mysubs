import { Redirect } from "expo-router";

import { useAuthSession } from "../src/auth/AuthSessionProvider";

export default function IndexRoute() {
  const { isLoading, token } = useAuthSession();

  if (isLoading) {
    return null;
  }

  return <Redirect href={token ? "/home" : "/(auth)/login"} />;
}
