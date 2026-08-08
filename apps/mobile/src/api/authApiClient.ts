import { createAuthApiClient } from "@subtrack/api-client";

const DEFAULT_ANDROID_API_BASE_URL = "http://10.0.2.2:3000";

export const authApiClient = createAuthApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_ANDROID_API_BASE_URL,
});
