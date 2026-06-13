export type Theme = {
  colors: {
    background: string;
    card: string;
    mutedText: string;
    primary: string;
    primaryText: string;
    text: string;
  };
  radius: {
    lg: number;
    md: number;
    sm: number;
  };
  spacing: {
    lg: number;
    md: number;
    sm: number;
    xl: number;
    xs: number;
  };
  typography: {
    body: number;
    caption: number;
    title: number;
  };
};

export const lightTheme: Theme = {
  colors: {
    background: "#F8FAFC",
    card: "#FFFFFF",
    mutedText: "#64748B",
    primary: "#2563EB",
    primaryText: "#FFFFFF",
    text: "#0F172A",
  },
  radius: {
    lg: 24,
    md: 16,
    sm: 8,
  },
  spacing: {
    lg: 24,
    md: 16,
    sm: 8,
    xl: 32,
    xs: 4,
  },
  typography: {
    body: 16,
    caption: 14,
    title: 32,
  },
};
