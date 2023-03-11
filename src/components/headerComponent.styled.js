import styled from "styled-components";

export const Header = styled.div`
  color: white;
  background-color: #00308f;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: larger;
  box-shadow: 0 4px 10px 0 #555;
`;
export const AppNameComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 36px;
    height: 36px;
  }
`;

export const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 8px;
  border-radius: 6px;
  width: 50%;
  align-items: center;
  gap: 5px;

  img {
    width: 20px;
    height: 20px;
  }
  input {
    border-color: transparent;
    padding: 0;
    margin-left: 15px;
    width: 100%;
    font-size: 15px;
    font-weight: bold;
  }
  input:focus {
    outline: none;
  }
`;
