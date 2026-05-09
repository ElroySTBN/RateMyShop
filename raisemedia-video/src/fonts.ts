import "@fontsource/geist-sans/300.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-sans/800.css";
import "@fontsource/geist-sans/900.css";
import "@fontsource/geist-mono/400.css";
import "@fontsource/geist-mono/500.css";
import "@fontsource/geist-mono/600.css";

const sans = '"Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif';
const mono = '"Geist Mono", "SF Mono", ui-monospace, Menlo, monospace';

// Backward-compatible aliases for scenes still using the previous keys.
// Will be unified to `sans` / `mono` in the upcoming script v2 rewrite.
export const fonts = {
  sans,
  mono,
  display: sans,
  serif: sans,
};
