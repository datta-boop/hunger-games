import styled from "styled-components";

export const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  justify-content: space-evenly;
  row-gap: 30px;
  column-gap: 15px;
`;

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 14px;
  border-color: black;
  border: 5px;
  box-shadow: 5px 10px 20px 10px #13274f;
  width: 200px;
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
    padding-right: 12px;
    padding-left: 0px;
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
  color: black;
  margin-bottom: 5px;
  padding-block-start: 5px;
  padding-block-end: 5px;
  color: white;
`;
export const IngredientsText = styled.span`
  font-size: 18px;
  border: solid 2px white;
  padding: 5px;
  font-weight: 400;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;

  width: 100%;
  :hover {
    cursor: pointer;
  }
`;
export const SeeMoreText = styled.span`
  font-size: 18px;
  border: solid 2px white;
  padding: 5px;
  font-weight: 400;
  color: white;
  border-radius: 8px;
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;
