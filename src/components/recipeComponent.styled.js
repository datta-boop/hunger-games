import styled, { keyframes, css } from "styled-components";

// ——— Shimmer animation for skeletons ———

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerMixin = css`
  background: linear-gradient(90deg, #F1F5F9 25%, #E2EAF4 50%, #F1F5F9 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

// ——— Recipe list grid ———

export const RecipeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
  padding: 24px 40px 40px;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 640px) {
    padding: 16px 20px 32px;
    gap: 16px;
    grid-template-columns: 1fr;
  }
`;

// ——— Recipe card ———

export const RecipeContainer = styled.div`
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;

  &:hover {
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

export const RecipeMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 7px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.span`
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const RecipeSource = styled.p`
  font-size: 11px;
  color: #CBD5E1;
  margin: 5px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DietBadges = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  padding: 4px 16px 8px;
`;

export const DietBadge = styled.span`
  font-size: 10px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 9999px;
  background: #F0FDF4;
  color: #15803D;
  border: 1px solid #BBF7D0;
  letter-spacing: 0.02em;
`;

export const RecipeButtonRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px 14px;
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

  &:hover {
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

  &:hover {
    background: #6D28D9;
  }
`;

// ——— Skeleton card ———

export const SkeletonCard = styled.div`
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  height: 180px;
  ${shimmerMixin}
`;

export const SkeletonBody = styled.div`
  padding: 14px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SkeletonLine = styled.div`
  height: ${props => props.$height || '14px'};
  width: ${props => props.$width || '100%'};
  border-radius: 4px;
  ${shimmerMixin}
`;

export const SkeletonButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px 16px 14px;
`;

export const SkeletonButton = styled.div`
  flex: 1;
  height: 34px;
  border-radius: 7px;
  ${shimmerMixin}
`;
