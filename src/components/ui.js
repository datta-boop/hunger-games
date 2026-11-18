import styled, { css, keyframes } from "styled-components";

export const rise = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: none; }
`;

export const shimmer = keyframes`
  0%   { background-position: -480px 0; }
  100% { background-position: 480px 0; }
`;

export const shimmerBg = css`
  background: linear-gradient(90deg, var(--surface) 25%, var(--surface-2) 50%, var(--surface) 75%);
  background-size: 480px 100%;
  animation: ${shimmer} 1.5s linear infinite;
`;

export const press = css`
  transition-property: scale, background-color, color, box-shadow, opacity, translate;
  transition-duration: 0.16s;
  transition-timing-function: var(--ease);
  &:active:not(:disabled) {
    scale: 0.96;
  }
`;

export const Mono = styled.span`
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--faint);
  font-variant-numeric: tabular-nums;
`;

const buttonTone = {
  primary: css`
    background: var(--accent);
    color: var(--accent-ink);
    &:hover:not(:disabled) { background: var(--accent-hover); }
  `,
  soft: css`
    background: var(--surface-2);
    color: var(--text);
    &:hover:not(:disabled) { background: var(--surface-3); }
  `,
  ghost: css`
    background: transparent;
    color: var(--text);
    box-shadow: inset 0 0 0 1px var(--line);
    &:hover:not(:disabled) { box-shadow: inset 0 0 0 1px var(--muted); }
  `,
};

export const Button = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 24px;
  border: 0;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  ${(p) => buttonTone[p.$tone || "primary"]}
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const IconButton = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: ${(p) => (p.$floating ? "rgba(15, 14, 12, 0.62)" : "var(--surface-2)")};
  backdrop-filter: ${(p) => (p.$floating ? "blur(8px)" : "none")};
  color: ${(p) => (p.$on ? p.$onColor || "var(--heat)" : p.$floating ? "rgba(242, 236, 223, 0.88)" : "var(--muted)")};
  &:hover:not(:disabled) {
    color: ${(p) => (p.$on ? p.$onColor || "var(--heat)" : p.$floating ? "#fff" : "var(--text)")};
    background: ${(p) => (p.$floating ? "rgba(15, 14, 12, 0.82)" : "var(--surface-3)")};
  }
  svg { stroke-width: 1.75; }
`;

export const Chip = styled.button`
  ${press}
  min-height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  background: ${(p) => (p.$on ? "var(--accent)" : "var(--surface-2)")};
  color: ${(p) => (p.$on ? "var(--accent-ink)" : "var(--muted)")};
  &:hover {
    background: ${(p) => (p.$on ? "var(--accent-hover)" : "var(--surface-3)")};
    color: ${(p) => (p.$on ? "var(--accent-ink)" : "var(--text)")};
  }
`;

export const Segmented = styled.div`
  display: inline-flex;
  gap: 2px;
  padding: 4px;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  background: var(--surface-2);
  border-radius: 999px;
  &::-webkit-scrollbar { display: none; }
`;

export const SegBtn = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 36px;
  min-width: 40px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  background: ${(p) => (p.$on ? "var(--text)" : "transparent")};
  color: ${(p) => (p.$on ? "var(--bg)" : "var(--muted)")};
  &:hover { color: ${(p) => (p.$on ? "var(--bg)" : "var(--text)")}; }
  svg { stroke-width: 1.75; }
`;

export const Field = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border: 0;
  border-radius: 14px;
  background: var(--surface-2);
  color: var(--text);
  font-size: 15px;
  transition: box-shadow 0.16s var(--ease);
  &::placeholder { color: var(--faint); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--focus); }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 12px 16px;
  border: 0;
  border-radius: 14px;
  background: var(--surface-2);
  color: var(--text);
  font-size: 15px;
  resize: vertical;
  transition: box-shadow 0.16s var(--ease);
  &::placeholder { color: var(--faint); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--focus); }
`;
