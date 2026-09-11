import type { Preview } from "@storybook/react-native-web-vite";
import { View } from "react-native";

import { ThemeProvider } from "../src/theme/ThemeProvider.js";
import { lightTheme } from "../src/theme/tokens.js";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <View
          style={{
            backgroundColor: lightTheme.colors.background,
            gap: lightTheme.spacing.md,
            padding: lightTheme.spacing.lg,
          }}
        >
          <Story />
        </View>
      </ThemeProvider>
    ),
  ],
  parameters: {
    a11y: { test: "todo" },
    backgrounds: { disable: true },
    controls: { expanded: true },
  },
};

export default preview;
