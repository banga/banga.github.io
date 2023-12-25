import { createContext } from "react";

export type BuildContextType = {
  baseUrl: string;
  postsDir: string;
  cssCacheBuster: string;
  shouldAutoReload: boolean;
};

export const DEFAULT_BUILD_CONTEXT: BuildContextType = {
  baseUrl: "https://shreyb.dev",
  postsDir: "./posts",
  cssCacheBuster: Date.now().toString(),
  shouldAutoReload: false,
};

export const BuildContext = createContext<BuildContextType>(
  DEFAULT_BUILD_CONTEXT
);
