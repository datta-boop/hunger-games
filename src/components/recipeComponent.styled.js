import styled, { keyframes, css } from "styled-components";

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerMixin = css`
  background: linear-gradient(90deg, #F5F0E8 25%, #EDE7DC 50%, #F5F0E8 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

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

export const RecipeContainer = styled.div`
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 1px 3px rgba(28, 26, 21, 0.06),
    0 4px 12px rgba(28, 26, 21, 0.06);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  animation: ${fadeInUp} 0.35s ease both;
  animation-delay: ${props => Math.min((props.$index || 0) * 60, 500)}ms;

  &:hover {
    box-shadow:
      0 2px 6px rgba(28, 26, 21, 0.06),
      0 12px 24px rgba(28, 26, 21, 0.1);
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
  transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
  color: ${props => props.$active ? '#DC4A2D' : '#A39B8F'};

  &:hover {
    background: #fff;
    transform: scale(1.12);
  }

  &:active {
    transform: scale(0.94);
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  outline: 1px solid oklch(0 0 0 / 0.1);
  outline-offset: -1px;
`;

export const RecipeCardBody = styled.div`
  padding: 14px 16px 8px;
  flex: 1;
`;

export const RecipeName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1C1A15;
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
  color: #A39B8F;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const RecipeSource = styled.p`
  font-size: 11px;
  color: #C4BAB0;
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
  background: #EBF5EE;
  color: #1A5C34;
  border: 1px solid #A8D5BC;
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
  color: #C4511A;
  background: #FDF0E8;
  border: none;
  border-radius: 8px;
  padding: 8px 0;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: #FAE0D0;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const SeeMoreText = styled.button`
  flex: 1;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  background: #C4511A;
  border: none;
  border-radius: 8px;
  padding: 8px 0;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover {
    background: #A33E12;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const CopyBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$copied ? '#2D6A4F' : '#C4BAB0'};
  padding: 6px;
  border-radius: 6px;
  transition: color 0.15s ease, background 0.15s ease, transform 0.1s ease;
  flex-shrink: 0;

  &:hover {
    color: ${props => props.$copied ? '#2D6A4F' : '#6B6456'};
    background: #F5F0E8;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const SkeletonCard = styled.div`
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(28, 26, 21, 0.05);
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
  border-radius: 8px;
  ${shimmerMixin}
`;
