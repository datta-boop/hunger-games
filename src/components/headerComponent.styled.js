import styled from "styled-components";

export const Header = styled.header`
  background: #ffffff;
  border-bottom: 1px solid #EAE5DA;
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
  gap: 9px;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: #1C1A15;
  letter-spacing: -0.01em;
  white-space: nowrap;
`;

export const SearchComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FDFAF5;
  border: 1.5px solid #EAE5DA;
  border-radius: 9999px;
  padding: 9px 16px;
  width: 380px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;

  :focus-within {
    border-color: #C4511A;
    box-shadow: 0 0 0 3px rgba(196, 81, 26, 0.1);
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
    color: #1C1A15;
    font-weight: 400;
    font-family: inherit;
  }

  input::placeholder {
    color: #A39B8F;
  }

  input:focus {
    outline: none;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;
