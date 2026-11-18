import styled from "styled-components";
import { Mono } from "./ui";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const Words = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
  gap: 5px;
  b {
    font-size: 21px;
    font-weight: 800;
    letter-spacing: -0.03em;
  }
`;

export const Logo = () => (
  <Wrap>
    <svg width="38" height="38" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="18" fill="var(--accent)" />
      <path d="M9 20h18a9 9 0 0 1-18 0Z" fill="var(--accent-ink)" />
      <path
        d="M13 8c-1.5 2 1.5 3 0 5M18 7c-1.5 2.4 1.5 3.6 0 6M23 8c-1.5 2 1.5 3 0 5"
        stroke="var(--accent-ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
    <Words>
      <b>Datta's</b>
      <Mono>Recipebook</Mono>
    </Words>
  </Wrap>
);
