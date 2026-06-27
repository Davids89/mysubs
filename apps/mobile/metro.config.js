const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

const isRelativeJavaScriptSpecifier = (moduleName) =>
  moduleName.endsWith(".js") &&
  (moduleName.startsWith("./") || moduleName.startsWith("../"));

config.resolver.resolveRequest = (context, moduleName, platform) => {
  try {
    return context.resolveRequest(context, moduleName, platform);
  } catch (error) {
    if (!isRelativeJavaScriptSpecifier(moduleName)) {
      throw error;
    }

    return context.resolveRequest(
      context,
      moduleName.slice(0, -".js".length),
      platform,
    );
  }
};

module.exports = config;
