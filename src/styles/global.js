import { createGlobalStyle, css } from "styled-components";

const dark = css`
  --bg: #0F0E0C;
  --surface: #171613;
  --surface-2: #211F1B;
  --surface-3: #2A2823;
  --line: #2E2B26;
  --text: #F2ECDF;
  --muted: #A8A296;
  --faint: #7A746A;
  --accent: #C9F23B;
  --accent-hover: #D8FF55;
  --accent-ink: #14160A;
  --accent-text: #C9F23B;
  --focus: #C9F23B;
  --heat: #FF5B3A;
  --star: #FFB830;
  --img-outline: oklch(1 0 0 / 0.1);
  --shadow-rgb: 0 0 0;
  --scrim-rgb: 8 7 6;
  --grain: 0.07;
  color-scheme: dark;
`;

const light = css`
  --bg: #F6F2E9;
  --surface: #FDFBF6;
  --surface-2: #EDE8DB;
  --surface-3: #E2DCCB;
  --line: #DAD3C1;
  --text: #1A1813;
  --muted: #5C574B;
  --faint: #756F61;
  --accent: #BDE62D;
  --accent-hover: #AAD31C;
  --accent-ink: #14160A;
  --accent-text: #46600A;
  --focus: #2F4206;
  --heat: #E2431F;
  --star: #D98E00;
  --img-outline: oklch(0 0 0 / 0.1);
  --shadow-rgb: 60 45 15;
  --scrim-rgb: 30 26 18;
  --grain: 0.05;
  color-scheme: light;
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    ${dark}
    --font-display: 'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif;
    --font-mono: 'DM Mono', ui-monospace, 'SF Mono', Menlo, monospace;
    --ease: cubic-bezier(0.2, 0, 0, 1);
  }

  @media (prefers-color-scheme: light) {
    :root:not([data-theme]) {
      ${light}
    }
  }

  :root[data-theme="light"] {
    ${light}
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { -webkit-text-size-adjust: 100%; }

  body {
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    font-size: 15px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 2000;
    pointer-events: none;
    opacity: var(--grain);
    mix-blend-mode: overlay;
    background-image: url("/noise.svg");
  }

  h1, h2, h3, p, ul, ol, figure { margin: 0; padding: 0; }
  ul, ol { list-style: none; }

  button, input, select, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
  img { display: block; max-width: 100%; }
  a { color: inherit; }

  :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }

  ::selection { background: var(--accent); color: var(--accent-ink); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
