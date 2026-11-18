import { useState } from "react";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import { FiX, FiHeart, FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";
import { Button, IconButton, Mono, Segmented, SegBtn, TextArea, press } from "./ui";
import { StarRating } from "./StarRating";
import { NOTABLE_LABELS } from "../constants";
import { kcalOf, nutrientOf, sentence } from "../utils";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const Scroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--surface-3) transparent;
`;

const Hero = styled.div`
  position: relative;
  height: 260px;
  background: var(--surface-2);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    outline: 1px solid var(--img-outline);
    outline-offset: -1px;
  }
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, var(--surface) 0%, transparent 55%);
  }
`;

const CloseSlot = styled.div`
  position: absolute;
  z-index: 1;
  top: 14px;
  right: 14px;
`;

const Head = styled.div`
  padding: 0 24px;
  margin-top: -36px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Name = styled.h2`
  font-size: clamp(30px, 6vw, 40px);
  font-weight: 800;
  line-height: 1.02;
  letter-spacing: -0.035em;
  text-wrap: balance;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--accent-text);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Strip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 20px 24px 8px;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 12px;
  border-radius: 16px;
  background: var(--surface-2);
  b {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
`;

const TabsRow = styled.div`
  padding: 16px 24px 4px;
  position: sticky;
  top: 0;
  z-index: 2;
  background: linear-gradient(to bottom, var(--surface) 70%, transparent);
`;

const Pane = styled.div`
  padding: 12px 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  padding: 14px 24px calc(14px + env(safe-area-inset-bottom));
  background: var(--surface);
  box-shadow: 0 -1px 0 var(--line), 0 -16px 32px rgb(var(--shadow-rgb) / 0.35);
`;

// ——— Ingredients ———

const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  .bar { flex: 1; height: 4px; border-radius: 2px; background: var(--surface-3); overflow: hidden; }
  .fill { height: 100%; background: var(--accent); transition: width 0.3s var(--ease); }
`;

const Item = styled.label`
  display: grid;
  grid-template-columns: 24px 44px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  position: relative;
  min-height: 60px;
  padding: 8px 12px;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.16s var(--ease);
  &:hover { background: var(--surface-2); }
  input { position: absolute; opacity: 0; pointer-events: none; }
  input:focus-visible + .box { outline: 2px solid var(--focus); outline-offset: 2px; }
  .box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    box-shadow: inset 0 0 0 2px var(--faint);
    background: ${(p) => (p.$done ? "var(--accent)" : "transparent")};
    color: var(--accent-ink);
    transition: background-color 0.16s var(--ease), box-shadow 0.16s var(--ease);
    ${(p) => p.$done && "box-shadow: none;"}
  }
  img {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    object-fit: cover;
    outline: 1px solid var(--img-outline);
    outline-offset: -1px;
    opacity: ${(p) => (p.$done ? 0.4 : 1)};
    transition: opacity 0.16s var(--ease);
  }
  .txt {
    line-height: 1.3;
    color: ${(p) => (p.$done ? "var(--faint)" : "var(--text)")};
    text-decoration: ${(p) => (p.$done ? "line-through" : "none")};
  }
`;

// ——— Nutrition ———

const BigKcal = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  b {
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -0.05em;
    line-height: 0.9;
    font-variant-numeric: tabular-nums;
  }
`;

const Stack = styled.div`
  display: flex;
  height: 14px;
  gap: 3px;
  span { display: block; height: 100%; min-width: 6px; border-radius: 4px; }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  .k { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--muted); }
  .dot { width: 8px; height: 8px; border-radius: 50%; }
`;

const MacroRow = styled.div`
  display: grid;
  grid-template-columns: 72px 1fr 52px;
  align-items: center;
  gap: 12px;
  .track { height: 8px; border-radius: 4px; background: var(--surface-2); overflow: hidden; }
  .fill { height: 100%; border-radius: 4px; transition: width 0.5s var(--ease); }
  .v { text-align: right; font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
`;

// ——— Reviews ———

const Card = styled.div`
  display: flex;
  gap: 14px;
  padding: 16px;
  border-radius: 20px;
  background: var(--surface-2);
`;

const Av = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--surface-3);
  font-size: 24px;
`;

const ReviewText = styled.p`
  margin-top: 8px;
  color: var(--text);
  line-height: 1.5;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const Link = styled.button`
  ${press}
  min-height: 44px;
  padding: 0 4px;
  border: 0;
  background: none;
  color: ${(p) => (p.$danger ? "var(--heat)" : "var(--accent-text)")};
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  background: var(--surface-2);
  textarea { background: var(--surface-3); }
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 24px;
  border-radius: 20px;
  background: var(--surface-2);
  p { color: var(--muted); }
`;

const TABS = [
  { id: "ingredients", label: "Ingredients" },
  { id: "nutrition", label: "Nutrition" },
  { id: "reviews", label: "Review" },
];

function DrawerBody({
  recipe, onClose, favorite, onToggleFavorite, copied, onCopy,
  profile, review, onSaveReview, onOpenProfile,
}) {
  const [tab, setTab] = useState("ingredients");
  const [done, setDone] = useState(() => new Set());
  const [rating, setRating] = useState(review?.rating || 0);
  const [text, setText] = useState(review?.text || "");
  const [editing, setEditing] = useState(!review);

  const kcal = kcalOf(recipe);
  const protein = nutrientOf(recipe, "PROCNT");
  const carbs = nutrientOf(recipe, "CHOCDF");
  const fat = nutrientOf(recipe, "FAT");
  const fiber = nutrientOf(recipe, "FIBTG");
  const hasNutrition = [protein, carbs, fat].some((v) => v !== null);
  const tags = (recipe.healthLabels || []).filter((l) => NOTABLE_LABELS.has(l)).slice(0, 4);
  const ingredients = recipe.ingredients || [];

  const macros = [
    { key: "Protein", g: protein || 0, kcal: (protein || 0) * 4, color: "var(--accent)" },
    { key: "Carbs", g: carbs || 0, kcal: (carbs || 0) * 4, color: "var(--star)" },
    { key: "Fat", g: fat || 0, kcal: (fat || 0) * 9, color: "var(--heat)" },
  ];
  const macroTotal = macros.reduce((s, m) => s + m.kcal, 0) || 1;
  const maxG = Math.max(...macros.map((m) => m.g), fiber || 0, 1);

  const toggle = (i) =>
    setDone((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const submit = () => {
    if (!rating) return;
    onSaveReview(recipe.uri, {
      username: profile.username,
      avatar: profile.avatar,
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    });
    setEditing(false);
  };

  const remove = () => {
    onSaveReview(recipe.uri, null);
    setRating(0);
    setText("");
    setEditing(true);
  };

  return (
    <Shell>
      <Scroll>
        <Hero>
          <img src={recipe.image} alt="" />
          <CloseSlot>
            <IconButton $floating onClick={onClose} aria-label="Close recipe">
              <FiX size={20} />
            </IconButton>
          </CloseSlot>
        </Hero>

        <Head>
          <Mono>{recipe.source ? `From ${recipe.source}` : "Recipe"}</Mono>
          <Name>{recipe.label}</Name>
          {tags.length > 0 && (
            <Tags>{tags.map((t) => <Tag key={t}>{t}</Tag>)}</Tags>
          )}
        </Head>

        <Strip>
          <Cell><b>{kcal ?? "—"}</b><Mono>kcal</Mono></Cell>
          <Cell><b>{recipe.totalTime > 0 ? recipe.totalTime : "—"}</b><Mono>min</Mono></Cell>
          <Cell><b>{recipe.yield || "—"}</b><Mono>serves</Mono></Cell>
          <Cell><b>{ingredients.length || "—"}</b><Mono>items</Mono></Cell>
        </Strip>

        <TabsRow>
          <Segmented role="tablist" aria-label="Recipe sections">
            {TABS.map((t) => (
              <SegBtn
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                $on={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                {t.id === "reviews" && review ? "Your review" : t.label}
              </SegBtn>
            ))}
          </Segmented>
        </TabsRow>

        {tab === "ingredients" && (
          <Pane role="tabpanel">
            <Progress>
              <Mono>{done.size} of {ingredients.length} ready</Mono>
              <div className="bar"><div className="fill" style={{ width: `${(done.size / (ingredients.length || 1)) * 100}%` }} /></div>
            </Progress>
            {ingredients.map((ing, i) => (
              <Item key={`${i}-${ing.text}`} $done={done.has(i)}>
                <input type="checkbox" checked={done.has(i)} onChange={() => toggle(i)} />
                <span className="box" aria-hidden="true">
                  {done.has(i) && <FiCheck size={16} strokeWidth={3} />}
                </span>
                <img src={ing.image} alt="" loading="lazy" />
                <span className="txt">{sentence(ing.text)}</span>
                <Mono>{Math.round(ing.weight)} g</Mono>
              </Item>
            ))}
          </Pane>
        )}

        {tab === "nutrition" && (
          <Pane role="tabpanel">
            {hasNutrition ? (
              <>
                <BigKcal>
                  <b>{kcal ?? "—"}</b>
                  <Mono>kcal per serving</Mono>
                </BigKcal>
                <Stack aria-hidden="true">
                  {macros.map((m) => (
                    <span key={m.key} style={{ width: `${(m.kcal / macroTotal) * 100}%`, background: m.color }} />
                  ))}
                </Stack>
                <Legend>
                  {macros.map((m) => (
                    <span className="k" key={m.key}>
                      <i className="dot" style={{ background: m.color }} />
                      {m.key} {Math.round((m.kcal / macroTotal) * 100)}%
                    </span>
                  ))}
                </Legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
                  {[...macros, { key: "Fiber", g: fiber || 0, color: "var(--muted)" }].map((m) => (
                    <MacroRow key={m.key}>
                      <span>{m.key}</span>
                      <div className="track"><div className="fill" style={{ width: `${(m.g / maxG) * 100}%`, background: m.color }} /></div>
                      <span className="v">{m.g} g</span>
                    </MacroRow>
                  ))}
                </div>
              </>
            ) : (
              <Empty><p>No nutrition data for this recipe.</p></Empty>
            )}
          </Pane>
        )}

        {tab === "reviews" && (
          <Pane role="tabpanel">
            {review && !editing && (
              <Card>
                <Av>{review.avatar}</Av>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Row>
                    <b>{review.username}</b>
                    <StarRating value={review.rating} size={14} />
                  </Row>
                  <Mono>{review.date}</Mono>
                  {review.text && <ReviewText>{review.text}</ReviewText>}
                  <Row style={{ marginTop: 8 }}>
                    <Link onClick={() => { setRating(review.rating); setText(review.text || ""); setEditing(true); }}>Edit</Link>
                    <Link $danger onClick={remove}>Remove</Link>
                  </Row>
                </div>
              </Card>
            )}

            {(!review || editing) &&
              (profile ? (
                <FormBox>
                  <div>
                    <Mono>Your rating</Mono>
                    <div style={{ marginTop: 6 }}>
                      <StarRating value={rating} onChange={setRating} size={24} />
                    </div>
                  </div>
                  <TextArea
                    aria-label="Review"
                    placeholder="What did you change? Any tips for next time?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <Row>
                    <Button onClick={submit} disabled={!rating}>Save review</Button>
                    {review && <Button $tone="ghost" onClick={() => setEditing(false)}>Cancel</Button>}
                  </Row>
                </FormBox>
              ) : (
                <Empty>
                  <p>Make a profile and your rating gets your name on it.</p>
                  <Button onClick={onOpenProfile}>Make a profile</Button>
                </Empty>
              ))}
          </Pane>
        )}
      </Scroll>

      <Footer>
        <Button
          style={{ flex: 1 }}
          onClick={() => window.open(recipe.url, "_blank", "noopener,noreferrer")}
        >
          Cook this <FiArrowUpRight size={18} strokeWidth={2} />
        </Button>
        <IconButton
          $on={favorite}
          aria-pressed={favorite}
          aria-label={favorite ? "Remove from saved" : "Save recipe"}
          onClick={() => onToggleFavorite(recipe)}
        >
          <FiHeart size={20} fill={favorite ? "currentColor" : "none"} />
        </IconButton>
        <IconButton
          $on={copied}
          $onColor="var(--accent-text)"
          aria-label={copied ? "Link copied" : "Copy recipe link"}
          onClick={() => onCopy(recipe)}
        >
          {copied ? <FiCheck size={20} /> : <FiCopy size={20} />}
        </IconButton>
      </Footer>
    </Shell>
  );
}

export function RecipeDrawer({ open, recipe, onClose, ...rest }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={{ enter: 320, exit: 220 }}
      ModalProps={{ BackdropProps: { style: { backgroundColor: "rgb(var(--scrim-rgb) / 0.62)" } } }}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 580 },
          maxWidth: "100%",
          backgroundColor: "var(--surface)",
          backgroundImage: "none",
          color: "var(--text)",
          boxShadow: "-1px 0 0 var(--line), -32px 0 80px rgb(var(--shadow-rgb) / 0.5)",
        },
      }}
    >
      {recipe && <DrawerBody key={recipe.uri} recipe={recipe} onClose={onClose} {...rest} />}
    </Drawer>
  );
}
