type FontWeight = "400" | "500";

type TextRole = {
  color: string;
  size: number;
  weight: FontWeight;
};

type SemanticColor = {
  background: string;
  text: string;
};

export type Theme = {
  colors: {
    background: string;
    border: {
      accent: string;
      default: string;
      error: string;
      strong: string;
    };
    brand: {
      dark: string;
      deeper: string;
      light: string;
      mid: string;
      primary: string;
    };
    card: string;
    mutedText: string;
    primary: string;
    primaryText: string;
    semantic: {
      danger: SemanticColor;
      neutral: SemanticColor;
      success: SemanticColor;
      warning: SemanticColor;
    };
    surface: {
      page: string;
      raised: string;
      subtle: string;
    };
    text: string;
    textRole: {
      inverse: string;
      muted: string;
      primary: string;
      secondary: string;
    };
  };
  components: {
    badge: {
      paddingHorizontal: number;
      paddingVertical: number;
    };
    button: {
      height: number;
      largeHeight: number;
      largePaddingHorizontal: number;
      paddingHorizontal: number;
      smallHeight: number;
      smallPaddingHorizontal: number;
    };
    emptyState: {
      paddingHorizontal: number;
      paddingVertical: number;
    };
    input: {
      height: number;
      paddingHorizontal: number;
    };
    subscriptionCard: {
      gap: number;
      paddingHorizontal: number;
      paddingVertical: number;
    };
  };
  radius: {
    circle: number;
    device: number;
    lg: number;
    md: number;
    pill: number;
    sm: number;
    xl: number;
    xs: number;
  };
  spacing: {
    "2xl": number;
    "3xl": number;
    hero: number;
    lg: number;
    md: number;
    sm: number;
    xl: number;
    xs: number;
  };
  strokeWidth: {
    accent: number;
    default: number;
  };
  typography: {
    body: TextRole;
    bodySmall: TextRole;
    caption: TextRole;
    heading: TextRole;
    label: TextRole;
    title: TextRole;
  };
};

export const lightTheme: Theme = {
  colors: {
    background: "#F8FAF9",
    border: {
      accent: "#9FE1CB",
      default: "#DDE5E1",
      error: "#E24B4A",
      strong: "#B8C5BF",
    },
    brand: {
      dark: "#0F6E56",
      deeper: "#085041",
      light: "#E1F5EE",
      mid: "#9FE1CB",
      primary: "#1D9E75",
    },
    card: "#FFFFFF",
    mutedText: "#7A8681",
    primary: "#1D9E75",
    primaryText: "#FFFFFF",
    semantic: {
      danger: {
        background: "#FCEBEB",
        text: "#A32D2D",
      },
      neutral: {
        background: "#F1F5F3",
        text: "#56635D",
      },
      success: {
        background: "#E1F5EE",
        text: "#0F6E56",
      },
      warning: {
        background: "#FAEEDA",
        text: "#854F0B",
      },
    },
    surface: {
      page: "#F8FAF9",
      raised: "#FFFFFF",
      subtle: "#F1F5F3",
    },
    text: "#17211C",
    textRole: {
      inverse: "#FFFFFF",
      muted: "#7A8681",
      primary: "#17211C",
      secondary: "#56635D",
    },
  },
  components: {
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    button: {
      height: 46,
      largeHeight: 54,
      largePaddingHorizontal: 28,
      paddingHorizontal: 24,
      smallHeight: 34,
      smallPaddingHorizontal: 14,
    },
    emptyState: {
      paddingHorizontal: 24,
      paddingVertical: 32,
    },
    input: {
      height: 44,
      paddingHorizontal: 12,
    },
    subscriptionCard: {
      gap: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
    },
  },
  radius: {
    circle: 999,
    device: 36,
    lg: 12,
    md: 8,
    pill: 20,
    sm: 6,
    xl: 18,
    xs: 4,
  },
  spacing: {
    "2xl": 28,
    "3xl": 44,
    hero: 60,
    lg: 16,
    md: 12,
    sm: 8,
    xl: 24,
    xs: 4,
  },
  strokeWidth: {
    accent: 2,
    default: 0.5,
  },
  typography: {
    body: {
      color: "#17211C",
      size: 15,
      weight: "400",
    },
    bodySmall: {
      color: "#17211C",
      size: 14,
      weight: "400",
    },
    caption: {
      color: "#7A8681",
      size: 11,
      weight: "400",
    },
    heading: {
      color: "#17211C",
      size: 18,
      weight: "500",
    },
    label: {
      color: "#56635D",
      size: 11,
      weight: "500",
    },
    title: {
      color: "#17211C",
      size: 22,
      weight: "500",
    },
  },
};
