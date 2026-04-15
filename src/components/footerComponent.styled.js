import styled from "styled-components";

export const Footer = styled.footer`
  background: #ffffff;
  border-top: 1px solid #E2E8F0;
  padding: 20px 40px;

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #94A3B8;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    width: fit-content;
    margin: 0 auto;
    transition: color 0.15s ease;

    :hover {
      color: #0F172A;
    }

    h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 500;
    }
  }
`;
