import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FiSearch, FiX, FiClock, FiTrendingUp, FiHeart, FiSliders, FiGithub, FiUser } from "react-icons/fi";
import { Logo } from "./Logo";
import { Chip, Mono, press } from "./ui";
import { FILTER_GROUPS, POPULAR_SEARCHES } from "../constants";

const Rail = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px;
  border-bottom: 1px solid var(--line);

  @media (min-width: 960px) {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    gap: 28px;
    padding: 28px 24px;
    border-bottom: 0;
    border-right: 1px solid var(--line);
    scrollbar-width: thin;
    scrollbar-color: var(--surface-3) transparent;
  }
`;

const RailTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ProfileBtn = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 150px;
  min-height: 44px;
  padding: 0 14px 0 6px;
  border: 0;
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
  &:hover { background: var(--surface-3); color: var(--text); }
  span.name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  svg { stroke-width: 1.75; }
`;

const Avatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-3);
  font-size: 17px;
  line-height: 1;
`;

const SearchWrap = styled.div`
  position: relative;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 56px;
  padding: 0 8px 0 18px;
  border-radius: 18px;
  background: var(--surface-2);
  color: var(--muted);
  transition: box-shadow 0.16s var(--ease);
  &:focus-within { box-shadow: 0 0 0 2px var(--accent); color: var(--text); }
  svg { flex-shrink: 0; stroke-width: 1.75; }
  input {
    flex: 1;
    min-width: 0;
    height: 100%;
    border: 0;
    background: transparent;
    color: var(--text);
    font-size: 17px;
    font-weight: 500;
  }
  input::placeholder { color: var(--faint); font-weight: 400; }
  input:focus-visible { outline: none; }
`;

const Kbd = styled(Mono)`
  display: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 8px;
  border-radius: 8px;
  background: var(--surface-3);
  color: var(--muted);
  @media (min-width: 960px) { display: inline-flex; }
`;

const ClearBtn = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  &:hover { color: var(--text); background: var(--surface-3); }
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  padding: 8px;
  border-radius: 16px;
  background: var(--surface-2);
  box-shadow: 0 0 0 1px var(--line), 0 16px 40px rgba(0, 0, 0, 0.55);
`;

const DropLabel = styled(Mono)`
  display: block;
  padding: 10px 12px 6px;
`;

const DropItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 15px;
  text-align: left;
  transition: background-color 0.12s var(--ease);
  &:hover { background: var(--surface-3); }
  svg { color: var(--faint); stroke-width: 1.75; flex-shrink: 0; }
`;

const FiltersToggle = styled.button`
  ${press}
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 48px;
  padding: 0 18px;
  border: 0;
  border-radius: 14px;
  background: var(--surface-2);
  color: var(--text);
  font-weight: 500;
  span { display: inline-flex; align-items: center; gap: 10px; }
  svg { stroke-width: 1.75; }
  @media (min-width: 960px) { display: none; }
`;

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
`;

const Panel = styled.div`
  display: ${(p) => (p.$open ? "flex" : "none")};
  flex-direction: column;
  gap: 24px;
  @media (min-width: 960px) { display: flex; }
`;

const Group = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
`;

const GroupLabel = styled(Mono).attrs({ as: "legend" })`
  padding: 0;
  margin-bottom: 10px;
  float: left;
  width: 100%;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const ClearAll = styled.button`
  ${press}
  align-self: flex-start;
  min-height: 36px;
  padding: 0 4px;
  border: 0;
  background: none;
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 4px;
`;

const SavedBtn = styled.button`
  ${press}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
  padding: 0 18px;
  border: 0;
  border-radius: 18px;
  font-size: 15px;
  font-weight: 600;
  background: ${(p) => (p.$on ? "var(--heat)" : "var(--surface-2)")};
  color: ${(p) => (p.$on ? "#1A0A05" : "var(--text)")};
  &:hover { background: ${(p) => (p.$on ? "#FF7050" : "var(--surface-3)")}; }
  span { display: inline-flex; align-items: center; gap: 10px; }
  svg { stroke-width: 1.75; }
  .n { font-family: var(--font-mono); font-size: 13px; font-variant-numeric: tabular-nums; opacity: 0.8; }
`;

const RailFoot = styled.a`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  color: var(--faint);
  font-size: 13px;
  text-decoration: none;
  transition: color 0.16s var(--ease);
  &:hover { color: var(--text); }
  svg { stroke-width: 1.75; }
  @media (max-width: 959px) { display: none; }
`;

export function Sidebar({
  query, onQuery, onClear, inputRef, recent, onPick,
  filters, onToggleFilter, onClearFilters, activeCount,
  savedOn, onToggleSaved, favCount, profile, onOpenProfile,
}) {
  const [suggest, setSuggest] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setSuggest(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (term) => {
    onPick(term);
    setSuggest(false);
  };

  return (
    <Rail aria-label="Search and filters">
      <RailTop>
        <Logo />
        <ProfileBtn onClick={onOpenProfile} aria-label={profile ? `Edit profile, ${profile.username}` : "Set up profile"}>
          <Avatar>{profile?.avatar || <FiUser size={15} />}</Avatar>
          <span className="name">{profile?.username || "Sign in"}</span>
        </ProfileBtn>
      </RailTop>

      <SearchWrap ref={wrapRef}>
        <SearchBox>
          <FiSearch size={20} />
          <input
            ref={inputRef}
            type="text"
            role="searchbox"
            aria-label="Search recipes"
            placeholder="Search any dish"
            value={query}
            autoComplete="off"
            onChange={(e) => onQuery(e.target.value)}
            onFocus={() => setSuggest(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSuggest(false);
                e.currentTarget.blur();
              }
              if (e.key === "Enter") setSuggest(false);
            }}
          />
          {query ? (
            <ClearBtn onClick={onClear} aria-label="Clear search">
              <FiX size={18} />
            </ClearBtn>
          ) : (
            <Kbd aria-hidden="true">/</Kbd>
          )}
        </SearchBox>

        {suggest && !query && (
          <Dropdown>
            {recent.length > 0 && (
              <>
                <DropLabel>Recent</DropLabel>
                {recent.map((t) => (
                  <DropItem key={t} onMouseDown={() => pick(t)}>
                    <FiClock size={16} />
                    {t}
                  </DropItem>
                ))}
              </>
            )}
            <DropLabel>Popular</DropLabel>
            {POPULAR_SEARCHES.map((t) => (
              <DropItem key={t} onMouseDown={() => pick(t)}>
                <FiTrendingUp size={16} />
                {t}
              </DropItem>
            ))}
          </Dropdown>
        )}
      </SearchWrap>

      <FiltersToggle
        onClick={() => setFiltersOpen((o) => !o)}
        aria-expanded={filtersOpen}
        aria-controls="filter-panel"
      >
        <span>
          <FiSliders size={18} /> Filters
        </span>
        {activeCount > 0 && <Count>{activeCount}</Count>}
      </FiltersToggle>

      <Panel id="filter-panel" $open={filtersOpen}>
        {FILTER_GROUPS.map((group) => (
          <Group key={group.key}>
            <GroupLabel>{group.label}</GroupLabel>
            <Chips>
              {group.options.map((o) => (
                <Chip
                  key={o.value}
                  $on={filters[group.key] === o.value}
                  aria-pressed={filters[group.key] === o.value}
                  onClick={() => onToggleFilter(group.key, o.value)}
                >
                  {o.label}
                </Chip>
              ))}
            </Chips>
          </Group>
        ))}
        {activeCount > 0 && <ClearAll onClick={onClearFilters}>Clear all filters</ClearAll>}
      </Panel>

      <SavedBtn $on={savedOn} aria-pressed={savedOn} onClick={onToggleSaved}>
        <span>
          <FiHeart size={18} fill={savedOn ? "currentColor" : "none"} />
          Saved recipes
        </span>
        <span className="n">{String(favCount).padStart(2, "0")}</span>
      </SavedBtn>

      <RailFoot href="https://github.com/datta-boop" target="_blank" rel="noreferrer">
        <FiGithub size={16} /> @datta-boop
      </RailFoot>
    </Rail>
  );
}
