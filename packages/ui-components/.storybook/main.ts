import type { StorybookConfig } from "@storybook/react-native-web-vite";

const config: StorybookConfig = {
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  stories: ["../src/**/*.stories.tsx"],
};

export default config;
