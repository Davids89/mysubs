type HomeScreenContent = {
  actionLabel: string;
  eyebrow: string;
  subtitle: string;
  title: string;
};

export const useHomeScreen = (): HomeScreenContent => ({
  actionLabel: "Auth setup comes next",
  eyebrow: "MySubs mobile",
  subtitle:
    "Navigation and theming are ready so US-AUTH-001 can start from a stable app shell.",
  title: "Track shared subscriptions with less friction",
});
