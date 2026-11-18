import styled from "styled-components";
import { FiStar } from "react-icons/fi";
import { press } from "./ui";

const Row = styled.div`
  display: inline-flex;
  gap: 2px;
`;

const Star = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.$box}px;
  height: ${(p) => p.$box}px;
  padding: 0;
  border: 0;
  background: none;
  color: ${(p) => (p.$on ? "var(--star)" : "var(--faint)")};
  cursor: ${(p) => (p.$interactive ? "pointer" : "default")};
  svg { stroke-width: 1.75; }
`;

export const StarRating = ({ value, onChange, size = 16 }) => {
  const box = onChange ? Math.max(size + 16, 44) : size + 4;
  return (
    <Row role={onChange ? "radiogroup" : "img"} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          type="button"
          $box={box}
          $on={n <= value}
          $interactive={!!onChange}
          tabIndex={onChange ? 0 : -1}
          aria-label={onChange ? `${n} star${n > 1 ? "s" : ""}` : undefined}
          onClick={onChange ? () => onChange(n) : undefined}
          disabled={!onChange}
          style={!onChange ? { pointerEvents: "none" } : undefined}
        >
          <FiStar size={size} fill={n <= value ? "currentColor" : "none"} />
        </Star>
      ))}
    </Row>
  );
};
