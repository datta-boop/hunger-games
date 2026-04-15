import styled from "styled-components";

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  row-gap: 30px;
  column-gap: 15px;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  border: 5px;
  box-shadow: 5px 10px 20px 10px #13274f;
  width: 240px;
  background-color: #00308f;
  border-radius: 6px;
  align-items: center;
  text-align: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    padding: 0;
  }
`;

export const CoverImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: solid 2px white;
  padding: 4px;
`;

export const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  padding-block-start: 5px;
  padding-block-end: 5px;
`;

export const IngredientsText = styled.button`
  font-size: 18px;
  border: solid 2px white;
  padding: 5px;
  font-weight: 400;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  width: 100%;
  background: transparent;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const SeeMoreText = styled.button`
  font-size: 18px;
  border: solid 2px white;
  padding: 5px;
  font-weight: 400;
  color: white;
  border-radius: 8px;
  width: 100%;
  background: transparent;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;
