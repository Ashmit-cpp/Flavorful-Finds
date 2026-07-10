import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --ink: #12110f;
    --ink-soft: #1c1a17;
    --paper: #f2ede4;
    --paper-deep: #e7dfd2;
    --oxblood: #702d28;
    --saffron: #d4a85d;
    --sage: #78806a;
    --line: rgba(18, 17, 15, 0.16);
    --serif: "Cormorant Garamond", "Iowan Old Style", "Baskerville", Georgia, serif;
    --sans: "Manrope", "Avenir Next", "Helvetica Neue", sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    background: var(--paper);
    color: var(--ink);
    font-family: var(--sans);
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  body::selection { background: var(--oxblood); color: var(--paper); }

  h1, h2, h3, h4, p { margin-top: 0; }
  h1, h2, h3 { font-family: var(--serif); font-weight: 500; line-height: .96; }
  a { color: inherit; text-decoration: none; }
  button, input, textarea { font: inherit; }
  button { cursor: pointer; }
  img { max-width: 100%; }

  :focus-visible {
    outline: 2px solid var(--saffron);
    outline-offset: 4px;
  }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: .75rem;
    margin: 0 0 1rem;
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .22em;
    text-transform: uppercase;
  }

  .eyebrow::before { content: ""; width: 2.4rem; height: 1px; background: currentColor; opacity: .55; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
`;

export default GlobalStyles;
