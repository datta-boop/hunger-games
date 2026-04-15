import styled from "styled-components";

export const FilterBar = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #E2E8F0;
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
  color: #94A3B8;
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
  transition: all 0.15s ease;
  background: ${props => props.$active ? '#7C3AED' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#64748B'};
  border: 1.5px solid ${props => props.$active ? '#7C3AED' : '#E2E8F0'};

  &:hover {
    ${props => !props.$active && `
      border-color: #7C3AED;
      color: #7C3AED;
    `}
  }
`;

export const FilterDivider = styled.div`
  width: 1px;
  height: 18px;
  background: #E2E8F0;
  flex-shrink: 0;
`;
