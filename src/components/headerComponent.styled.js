import styled from "styled-components";

export const Header = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
  padding: 0 40px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 640px) {
    padding: 12px 16px;
    height: auto;
    flex-direction: column;
    gap: 10px;
  }
`;

export const AppNameComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 17px;
  font-weight: 700;
  color: #0F172A;
  letter-spacing: -0.02em;
  white-space: nowrap;

  img {
    width: 26px;
    height: 26px;
  }
`;

export const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F8FAFC;
  border: 1.5px solid #E2E8F0;
  border-radius: 9999px;
  padding: 9px 16px;
  width: 380px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  :focus-within {
    border-color: #7C3AED;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.08);
    background: #ffffff;
  }

  img {
    width: 15px;
    height: 15px;
    opacity: 0.35;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    width: 100%;
    font-size: 14px;
    color: #0F172A;
    font-weight: 400;
    font-family: inherit;
  }

  input::placeholder {
    color: #94A3B8;
  }

  input:focus {
    outline: none;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;
