import { createContext } from "react";

export type BuildContextType = { cssCacheBuster: string } & (
  | { shouldAutoReload?: false }
  | { shouldAutoReload: true; hashFile: string }
);

export const BuildContext = createContext<BuildContextType>({
  cssCacheBuster: Date.now().toString(),
});
