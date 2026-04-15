import styled from "styled-components";

export const RecipeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding: 40px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 640px) {
    padding: 20px;
    gap: 16px;
    grid-template-columns: 1fr;
  }
`;

export const RecipeContainer = styled.div`
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;

  :hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
`;

export const RecipeCardBody = styled.div`
  padding: 14px 16px 8px;
  flex: 1;
`;

export const RecipeName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0F172A;
  margin: 0;
  line-height: 1.45;
  letter-spacing: -0.01em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const RecipeButtonRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px 14px;
`;

export const IngredientsText = styled.button`
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #7C3AED;
  background: #EDE9FE;
  border: none;
  border-radius: 7px;
  padding: 8px 0;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease;

  :hover {
    background: #DDD6FE;
  }
`;

export const SeeMoreText = styled.button`
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  background: #7C3AED;
  border: none;
  border-radius: 7px;
  padding: 8px 0;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease;

  :hover {
    background: #6D28D9;
  }
`;
