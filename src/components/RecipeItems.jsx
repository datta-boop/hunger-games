import { memo } from "react";
import styled from "styled-components";
import { FiHeart, FiStar } from "react-icons/fi";
import { kcalOf, pad } from "../utils";
import { IconButton, Mono, press, rise, shimmerBg } from "./ui";

// ——— Index row ———

const RowItem = styled.li`
  position: relative;
  border-bottom: 1px solid var(--line);
  animation: ${rise} 0.4s var(--ease) both;
`;

const RowOpen = styled.button`
  display: grid;
  grid-template-columns: 28px 76px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  width: 100%;
  margin: 4px 0;
  padding: 8px 68px 8px 8px;
  border: 0;
  border-radius: 18px;
  background: transparent;
  color: inherit;
  text-align: left;
  transition: background-color 0.16s var(--ease);
  &:hover { background: var(--surface); }
  &:hover img { scale: 1.06; }

  @media (min-width: 1240px) {
    grid-template-columns: 32px 88px minmax(0, 1fr) repeat(3, 84px);
    gap: 18px;
  }
`;

const Num = styled(Mono)`
  text-align: center;
`;

const ThumbWrap = styled.span`
  display: block;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  background: var(--surface-2);
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
  border-radius: 10px;
  transition: scale 0.4s var(--ease);
`;

const Text = styled.span`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.015em;
  text-wrap: balance;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Source = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rated = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--star);
  font-family: var(--font-mono);
  font-size: 12px;
  svg { stroke-width: 1.75; }
`;

const Inline = styled(Mono)`
  @media (min-width: 1240px) { display: none; }
`;

const Stat = styled.span`
  display: none;
  flex-direction: column;
  gap: 2px;
  @media (min-width: 1240px) { display: flex; }
  b {
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
`;

const HeartSlot = styled.span`
  position: absolute;
  top: 50%;
  right: 8px;
  margin-top: -24px;
`;

// ——— Gallery tile ———

const TileItem = styled.li`
  position: relative;
  animation: ${rise} 0.4s var(--ease) both;
`;

const TileOpen = styled.button`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 24px;
  background: var(--surface-2);
  color: #fff;
  text-align: left;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 12px 32px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.2s var(--ease), translate 0.2s var(--ease);
  &:hover { translate: 0 -3px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 20px 44px rgba(0, 0, 0, 0.5); }
  &:hover img { scale: 1.05; }
`;

const TileImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  outline: 1px solid oklch(1 0 0 / 0.1);
  outline-offset: -1px;
  border-radius: 24px;
  transition: scale 0.5s var(--ease);
`;

const TileShade = styled.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 9, 8, 0.92) 0%, rgba(10, 9, 8, 0.55) 34%, transparent 62%);
`;

const TileBody = styled.span`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TileTitle = styled.span`
  font-size: 21px;
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
  text-wrap: balance;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TileStats = styled(Mono)`
  color: rgba(255, 255, 255, 0.72);
`;

const TileHeart = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
`;

// ——— Skeletons ———

const SkelRow = styled.li`
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 14px;
  padding: 12px 8px;
  border-bottom: 1px solid var(--line);
  .img { aspect-ratio: 1; border-radius: 10px; ${shimmerBg} }
  .lines { display: flex; flex-direction: column; gap: 10px; justify-content: center; }
  .l { height: 14px; border-radius: 6px; ${shimmerBg} }
`;

const SkelTile = styled.li`
  aspect-ratio: 4 / 5;
  border-radius: 24px;
  ${shimmerBg}
`;

export const RowSkeleton = () => (
  <SkelRow aria-hidden="true">
    <div className="img" />
    <div className="lines">
      <div className="l" style={{ width: "70%" }} />
      <div className="l" style={{ width: "40%", height: 11 }} />
    </div>
  </SkelRow>
);

export const TileSkeleton = () => <SkelTile aria-hidden="true" />;

// ——— Public components ———

const delay = (i) => ({ animationDelay: `${Math.min(i, 10) * 35}ms` });

const FavButton = ({ recipe, favorite, onToggle, floating }) => (
  <IconButton
    $floating={floating}
    $on={favorite}
    type="button"
    aria-pressed={favorite}
    aria-label={favorite ? `Remove ${recipe.label} from saved` : `Save ${recipe.label}`}
    onClick={() => onToggle(recipe)}
  >
    <FiHeart size={20} fill={favorite ? "currentColor" : "none"} />
  </IconButton>
);

export const RecipeRow = memo(function RecipeRow({ recipe, index, favorite, rating, onOpen, onToggleFavorite }) {
  const kcal = kcalOf(recipe);
  const time = recipe.totalTime > 0 ? recipe.totalTime : null;
  const items = recipe.ingredients?.length || 0;

  return (
    <RowItem style={delay(index)}>
      <RowOpen type="button" onClick={() => onOpen(recipe)}>
        <Num>{pad(index + 1)}</Num>
        <ThumbWrap>
          <Thumb src={recipe.image} alt="" loading="lazy" />
        </ThumbWrap>
        <Text>
          <Title>{recipe.label}</Title>
          <Source>
            {recipe.source}
            {rating > 0 && (
              <Rated>
                <FiStar size={12} fill="currentColor" /> {rating}
              </Rated>
            )}
          </Source>
          <Inline>
            {[kcal && `${kcal} kcal`, time && `${time} min`].filter(Boolean).join("  ·  ")}
          </Inline>
        </Text>
        <Stat><b>{kcal ?? "—"}</b><Mono>kcal</Mono></Stat>
        <Stat><b>{time ?? "—"}</b><Mono>min</Mono></Stat>
        <Stat><b>{items || "—"}</b><Mono>items</Mono></Stat>
      </RowOpen>
      <HeartSlot>
        <FavButton recipe={recipe} favorite={favorite} onToggle={onToggleFavorite} />
      </HeartSlot>
    </RowItem>
  );
});

export const RecipeTile = memo(function RecipeTile({ recipe, index, favorite, onOpen, onToggleFavorite }) {
  const kcal = kcalOf(recipe);
  const time = recipe.totalTime > 0 ? recipe.totalTime : null;

  return (
    <TileItem style={delay(index)}>
      <TileOpen type="button" onClick={() => onOpen(recipe)}>
        <TileImg src={recipe.image} alt="" loading="lazy" />
        <TileShade />
        <TileBody>
          <TileTitle>{recipe.label}</TileTitle>
          <TileStats>
            {[kcal && `${kcal} kcal`, time && `${time} min`].filter(Boolean).join("  ·  ")}
          </TileStats>
        </TileBody>
      </TileOpen>
      <TileHeart>
        <FavButton recipe={recipe} favorite={favorite} onToggle={onToggleFavorite} floating />
      </TileHeart>
    </TileItem>
  );
});
