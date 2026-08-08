const { getDefaultConfig } = require("expo/metro-config");
const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
const config = getDefaultConfig(projectRoot);

const resolveSourceSpecifier = (originModulePath, moduleName) => {
  if (!moduleName.startsWith(".") || !moduleName.endsWith(".js")) {
    return null;
  }

  const basePath = path.resolve(
    path.dirname(originModulePath),
    moduleName.slice(0, -3),
  );
  const sourceCandidates = [`${basePath}.ts`, `${basePath}.tsx`];

  return sourceCandidates.find((candidate) => fs.existsSync(candidate)) ?? null;
};

config.watchFolders = [workspaceRoot];
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const sourcePath = resolveSourceSpecifier(context.originModulePath, moduleName);

  if (sourcePath) {
    return {
      filePath: sourcePath,
      type: "sourceFile",
    };
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
