import { ReactElement } from "react";
import fs from "node:fs";
import path from "node:path";
import satori, { SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";

const FONT_DIR = new URL(
  "../../node_modules/@fontsource/inter/files/",
  import.meta.url
).pathname;

const FONT_WEIGHTS = [300, 400, 600] as const;
const FONTS: SatoriOptions["fonts"] = FONT_WEIGHTS.map((weight) => ({
  name: fontFamily(weight),
  data: fs.readFileSync(
    path.join(FONT_DIR, `inter-latin-${weight}-normal.woff`)
  ),
  weight,
}));

export function fontFamily(weight: (typeof FONT_WEIGHTS)[number]): string {
  return `inter-${weight}`;
}

export async function generateOpenGraphImageAsync(
  element: ReactElement
): Promise<Buffer> {
  const svg = await satori(element, {
    width: 800,
    height: 400,
    fonts: FONTS,
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: { loadSystemFonts: false },
    // logLevel: "warn",
  });
  return resvg.render().asPng();
}
