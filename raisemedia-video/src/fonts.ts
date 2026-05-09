import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: interFamily } = loadInter("normal", {
  weights: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const { fontFamily: jbMonoFamily } = loadJetBrainsMono("normal", {
  weights: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const sans = `${interFamily}, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif`;
const mono = `${jbMonoFamily}, "SF Mono", ui-monospace, Menlo, monospace`;

export const fonts = {
  sans,
  mono,
  // Backward-compat for any leftover refs
  display: sans,
  serif: sans,
};
