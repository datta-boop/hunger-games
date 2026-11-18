import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0F0E0C;
    --surface: #171613;
    --surface-2: #211F1B;
    --surface-3: #2A2823;
    --line: #2E2B26;
    --text: #F2ECDF;
    --muted: #A8A296;
    --faint: #7A746A;
    --accent: #C9F23B;
    --accent-ink: #14160A;
    --heat: #FF5B3A;
    --star: #FFB830;
    --font-display: 'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif;
    --font-mono: 'DM Mono', ui-monospace, 'SF Mono', Menlo, monospace;
    --ease: cubic-bezier(0.2, 0, 0, 1);
    color-scheme: dark;
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
    opacity: 0.07;
    mix-blend-mode: overlay;
    background-image: url("/noise.svg");
  }

  h1, h2, h3, p, ul, ol, figure { margin: 0; padding: 0; }
  ul, ol { list-style: none; }

  button, input, select, textarea { font: inherit; color: inherit; }
  button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
  img { display: block; max-width: 100%; }
  a { color: inherit; }

  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

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
