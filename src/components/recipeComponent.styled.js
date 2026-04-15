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

// ——— Card entrance animation ———

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
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
  animation: ${fadeInUp} 0.35s ease both;
  animation-delay: ${props => Math.min((props.$index || 0) * 60, 500)}ms;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
  }
`;

export const CardImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const FavoriteBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
  color: ${props => props.$active ? '#EF4444' : '#94A3B8'};

  &:hover {
    background: #fff;
    transform: scale(1.12);
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
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
  align-items: center;
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

export const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$copied ? '#15803D' : '#CBD5E1'};
  padding: 6px;
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease;
  flex-shrink: 0;

  &:hover {
    color: ${props => props.$copied ? '#15803D' : '#64748B'};
    background: #F8FAFC;
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
