import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";

const { fontFamily: frauncesFamily } = loadFraunces("normal", {
  weights: ["300", "400", "600", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: monoFamily } = loadJetBrainsMono("normal", {
  weights: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const { fontFamily: instrumentFamily } = loadInstrumentSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

export const fonts = {
  display: frauncesFamily,
  serif: instrumentFamily,
  mono: monoFamily,
};
