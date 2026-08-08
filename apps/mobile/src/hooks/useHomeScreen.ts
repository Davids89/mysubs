type StatChipContent = {
  label: string;
  value: string;
};

type HomeScreenContent = {
  actionLabel: string;
  emptyBody: string;
  emptyTitle: string;
  stats: StatChipContent[];
  subtitle: string;
  title: string;
};

export const useHomeScreen = (): HomeScreenContent => ({
  actionLabel: "Add subscription",
  emptyBody: "Add your first subscription to start managing them.",
  emptyTitle: "Add your first subscription",
  stats: [
    {
      label: "Monthly",
      value: "€0",
    },
    {
      label: "Active",
      value: "0",
    },
    {
      label: "Shared",
      value: "0",
    },
  ],
  subtitle: "0 active subscriptions",
  title: "My subscriptions",
});
