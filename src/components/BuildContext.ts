import { createContext } from "react";

export type BuildContextType = {
  baseUrl: string;
  cssCacheBuster: string;
  shouldAutoReload: boolean;
  includeDrafts: boolean;
};

export const DEFAULT_BUILD_CONTEXT: BuildContextType = {
  baseUrl: "https://shreyb.dev",
  cssCacheBuster: Date.now().toString(),
  shouldAutoReload: false,
  includeDrafts: false,
};

export const BuildContext = createContext<BuildContextType>(
  DEFAULT_BUILD_CONTEXT
);
