import styled from "styled-components";

export const FilterBar = styled.div`
  background: #FDFAF5;
  border-bottom: 1px solid #EAE5DA;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }

  @media (max-width: 640px) {
    padding: 10px 16px;
    gap: 12px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

export const FilterLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #A39B8F;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  white-space: nowrap;
`;

export const FilterPills = styled.div`
  display: flex;
  gap: 5px;
`;

export const FilterPill = styled.button`
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  padding: 4px 11px;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.1s ease;
  background: ${props => props.$active ? '#C4511A' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#6B6456'};
  border: 1.5px solid ${props => props.$active ? '#C4511A' : '#EAE5DA'};

  &:hover {
    ${props => !props.$active && `
      border-color: #C4511A;
      color: #C4511A;
    `}
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const FilterDivider = styled.div`
  width: 1px;
  height: 18px;
  background: #EAE5DA;
  flex-shrink: 0;
`;
