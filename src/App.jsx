import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styled from "styled-components";
import Axios from "axios";
import { FiArrowUpRight, FiGrid, FiList } from "react-icons/fi";

import { GlobalStyle } from "./styles/global";
import { APP_ID, API_KEY, SORT_OPTIONS, POPULAR_SEARCHES, LS } from "./constants";
import { useStored } from "./hooks/useStored";
import { greeting, pad } from "./utils";
import { Sidebar } from "./components/Sidebar";
import { RecipeDrawer } from "./components/RecipeDrawer";
import { ProfileModal } from "./components/ProfileModal";
import { RecipeRow, RecipeTile, RowSkeleton, TileSkeleton } from "./components/RecipeItems";
import { Button, Chip, Mono, Segmented, SegBtn, rise } from "./components/ui";

// ——— Layout ———

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  @media (min-width: 960px) {
    grid-template-columns: 340px minmax(0, 1fr);
  }
`;

const Main = styled.main`
  min-width: 0;
  padding: 32px 16px 96px;
  @media (min-width: 960px) {
    padding: 64px clamp(32px, 5vw, 80px) 120px;
  }
`;

const Inner = styled.div`
  max-width: 1100px;
`;

// ——— Idle screen ———

const Eyebrow = styled(Mono)`
  display: block;
  animation: ${rise} 0.5s var(--ease) both;
`;

const HeroTitle = styled.h1`
  margin: 16px 0 20px;
  font-size: clamp(52px, 9vw, 124px);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.045em;
  text-wrap: balance;
  animation: ${rise} 0.5s var(--ease) 70ms both;
  em { font-style: normal; color: var(--accent); }
`;

const HeroCopy = styled.p`
  max-width: 46ch;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.5;
  text-wrap: pretty;
  animation: ${rise} 0.5s var(--ease) 140ms both;
`;

const IndexHead = styled(Mono)`
  display: block;
  margin: 56px 0 12px;
  animation: ${rise} 0.5s var(--ease) 210ms both;
`;

const IndexList = styled.ul`
  animation: ${rise} 0.5s var(--ease) 240ms both;
`;

const IndexRow = styled.button`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  align-items: center;
  width: 100%;
  min-height: 72px;
  padding: 10px 0;
  border: 0;
  border-top: 1px solid var(--line);
  background: none;
  color: var(--text);
  font-size: clamp(30px, 5vw, 56px);
  font-weight: 600;
  letter-spacing: -0.03em;
  text-align: left;
  transition: color 0.16s var(--ease);
  svg { color: var(--faint); stroke-width: 1.5; transition: color 0.16s var(--ease), translate 0.2s var(--ease); }
  &:hover { color: var(--accent); }
  &:hover svg { color: var(--accent); translate: 4px -4px; }
  li:last-child > & { border-bottom: 1px solid var(--line); }
`;

const Recent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  animation: ${rise} 0.5s var(--ease) 300ms both;
`;

// ——— Results ———

const Head = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px 24px;
  margin-bottom: 20px;
`;

const Big = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px 16px;
  b {
    font-size: clamp(56px, 8vw, 96px);
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -0.05em;
    font-variant-numeric: tabular-nums;
  }
  span { font-size: 18px; color: var(--muted); }
  em { font-style: normal; color: var(--text); font-weight: 600; }
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 100%;
`;

const IndexUl = styled.ul`
  border-top: 1px solid var(--line);
`;

const Gallery = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 16px;
`;

const More = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

// ——— Empty / error ———

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding-top: 8vh;
  animation: ${rise} 0.4s var(--ease) both;
  h2 {
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.04em;
    text-wrap: balance;
  }
  p { max-width: 44ch; color: var(--muted); font-size: 18px; text-wrap: pretty; }
`;

// ——— App ———

const NO_FILTERS = { meal: "", diet: "", kcal: "", time: "" };

export default function App() {
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get("q") || "");
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [filters, setFilters] = useState(NO_FILTERS);
  const [sortBy, setSortBy] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);

  const [view, setView] = useStored(LS.view, "index");
  const [favorites, setFavorites] = useStored(LS.favorites, {});
  const [recent, setRecent] = useStored(LS.recent, []);
  const [profile, setProfile] = useStored(LS.profile, null);
  const [reviews, setReviews] = useStored(LS.reviews, {});

  const [openRecipe, setOpenRecipe] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [copiedUri, setCopiedUri] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const q = query.trim();
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
    document.title = q ? `${q} · Datta's Recipebook` : "Datta's Recipebook";
  }, [query]);

  useEffect(() => {
    if (savedOnly) return;
    const q = query.trim();
    if (!q) {
      setHits([]);
      setError(false);
      setLoading(false);
      setNextUrl(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(false);
      setHits([]);
      setNextUrl(null);

      let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(q)}&app_id=${APP_ID}&app_key=${API_KEY}`;
      if (filters.meal) url += `&mealType=${encodeURIComponent(filters.meal)}`;
      if (filters.diet) url += `&health=${encodeURIComponent(filters.diet)}`;

      try {
        const res = await Axios.get(url, { signal: controller.signal });
        setHits(res.data.hits);
        setNextUrl(res.data._links?.next?.href || null);
        setRecent((prev) => [q, ...prev.filter((s) => s.toLowerCase() !== q.toLowerCase())].slice(0, 5));
      } catch (err) {
        if (Axios.isCancel(err) || err.code === "ERR_CANCELED") return;
        setError(true);
        setHits([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, filters.meal, filters.diet, retryKey, savedOnly, setRecent]);

  const loadMore = async () => {
    if (!nextUrl || loadingMore) return;
    setLoadingMore(true);
    try {
      const res = await Axios.get(nextUrl);
      setHits((prev) => [...prev, ...res.data.hits]);
      setNextUrl(res.data._links?.next?.href || null);
    } catch {
      /* keep the existing list */
    } finally {
      setLoadingMore(false);
    }
  };

  const toggleFavorite = useCallback(
    (recipe) =>
      setFavorites((prev) => {
        const next = { ...prev };
        if (next[recipe.uri]) delete next[recipe.uri];
        else next[recipe.uri] = recipe;
        return next;
      }),
    [setFavorites]
  );

  const copyLink = useCallback((recipe) => {
    navigator.clipboard?.writeText(recipe.url).then(() => {
      setCopiedUri(recipe.uri);
      setTimeout(() => setCopiedUri(null), 1800);
    });
  }, []);

  const saveReview = useCallback(
    (uri, data) =>
      setReviews((prev) => {
        const next = { ...prev };
        if (data === null) delete next[uri];
        else next[uri] = data;
        return next;
      }),
    [setReviews]
  );

  const open = useCallback((recipe) => {
    setOpenRecipe(recipe);
    setDrawerOpen(true);
  }, []);

  const toggleFilter = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? "" : value }));

  const pickTerm = (term) => {
    setQuery(term);
    setSavedOnly(false);
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const list = useMemo(() => {
    let out = savedOnly ? Object.values(favorites) : hits.map((h) => h.recipe);
    const perServing = (r) => (r.calories && r.yield ? r.calories / r.yield : null);

    if (filters.kcal) out = out.filter((r) => { const c = perServing(r); return c !== null && c < filters.kcal; });
    if (filters.time) out = out.filter((r) => r.totalTime > 0 && r.totalTime <= filters.time);

    const by = {
      calories: (a, b) => (perServing(a) ?? Infinity) - (perServing(b) ?? Infinity),
      time: (a, b) => (a.totalTime || Infinity) - (b.totalTime || Infinity),
      ingredients: (a, b) => (a.ingredients?.length || 0) - (b.ingredients?.length || 0),
    }[sortBy];
    return by ? [...out].sort(by) : out;
  }, [hits, savedOnly, favorites, filters.kcal, filters.time, sortBy]);

  const activeCount = Object.values(filters).filter((v) => v !== "").length;
  const favCount = Object.keys(favorites).length;
  const searching = query.trim().length > 0;
  const idle = !searching && !savedOnly;
  const empty = !loading && !error && !idle && list.length === 0;
  const Skeleton = view === "gallery" ? TileSkeleton : RowSkeleton;
  const Wrapper = view === "gallery" ? Gallery : IndexUl;

  let body;
  if (error) {
    body = (
      <Notice>
        <Mono>Connection problem</Mono>
        <h2>The kitchen went quiet.</h2>
        <p>We couldn't reach the recipe service. Check your connection and try again.</p>
        <Button onClick={() => setRetryKey((k) => k + 1)}>Try again</Button>
      </Notice>
    );
  } else if (idle) {
    body = (
      <Inner>
        <Eyebrow>
          {greeting()}
          {profile ? `, ${profile.username}` : ""}
        </Eyebrow>
        <HeroTitle>
          What's on the <em>stove?</em>
        </HeroTitle>
        <HeroCopy>
          Search any dish or ingredient, narrow it by diet, calories and time, then save the keepers.
        </HeroCopy>

        <IndexHead>Start with</IndexHead>
        <IndexList>
          {POPULAR_SEARCHES.map((term, i) => (
            <li key={term}>
              <IndexRow onClick={() => pickTerm(term)}>
                <Mono>{pad(i + 1)}</Mono>
                {term}
                <FiArrowUpRight size={36} aria-hidden="true" />
              </IndexRow>
            </li>
          ))}
        </IndexList>

        {recent.length > 0 && (
          <Recent>
            <Mono>Recent</Mono>
            {recent.map((t) => (
              <Chip key={t} onClick={() => pickTerm(t)}>{t}</Chip>
            ))}
          </Recent>
        )}
      </Inner>
    );
  } else if (empty) {
    body = savedOnly ? (
      <Notice>
        <Mono>Saved recipes</Mono>
        <h2>Nothing saved yet.</h2>
        <p>Tap the heart on any recipe and it will wait for you here.</p>
        <Button onClick={() => setSavedOnly(false)}>Find a recipe</Button>
      </Notice>
    ) : (
      <Notice>
        <Mono>No matches</Mono>
        <h2>No “{query.trim()}” that fits.</h2>
        <p>
          {activeCount > 0
            ? "Your filters may be too tight. Loosen a few and it should turn something up."
            : "Try a simpler word, like the main ingredient."}
        </p>
        {activeCount > 0 && <Button $tone="soft" onClick={() => setFilters(NO_FILTERS)}>Clear filters</Button>}
      </Notice>
    );
  } else {
    body = (
      <Inner>
        <Head>
          <Big>
            <b>{loading ? "··" : pad(list.length)}</b>
            <span>
              {savedOnly ? (
                "saved recipes"
              ) : (
                <>
                  recipes for <em>“{query.trim()}”</em>
                </>
              )}
              {nextUrl && !loading && !savedOnly ? " so far" : ""}
            </span>
          </Big>
          <Controls>
            <Segmented role="group" aria-label="Sort by">
              {SORT_OPTIONS.map((o) => (
                <SegBtn key={o.label} $on={sortBy === o.value} aria-pressed={sortBy === o.value} onClick={() => setSortBy(o.value)}>
                  {o.label}
                </SegBtn>
              ))}
            </Segmented>
            <Segmented role="group" aria-label="Layout">
              <SegBtn $on={view !== "gallery"} aria-pressed={view !== "gallery"} aria-label="List layout" onClick={() => setView("index")}>
                <FiList size={17} />
              </SegBtn>
              <SegBtn $on={view === "gallery"} aria-pressed={view === "gallery"} aria-label="Gallery layout" onClick={() => setView("gallery")}>
                <FiGrid size={17} />
              </SegBtn>
            </Segmented>
          </Controls>
        </Head>

        <Wrapper aria-busy={loading}>
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
            : list.map((r, i) => {
                const props = {
                  recipe: r,
                  index: i,
                  favorite: !!favorites[r.uri],
                  onOpen: open,
                  onToggleFavorite: toggleFavorite,
                };
                return view === "gallery" ? (
                  <RecipeTile key={r.uri} {...props} />
                ) : (
                  <RecipeRow key={r.uri} {...props} rating={reviews[r.uri]?.rating || 0} />
                );
              })}
        </Wrapper>

        {!loading && nextUrl && !savedOnly && (
          <More>
            <Button $tone="soft" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? "Loading…" : "Show more recipes"}
            </Button>
          </More>
        )}
      </Inner>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Shell>
        <Sidebar
          query={query}
          onQuery={(v) => { setQuery(v); setSavedOnly(false); }}
          onClear={clearQuery}
          inputRef={inputRef}
          recent={recent}
          onPick={pickTerm}
          filters={filters}
          onToggleFilter={toggleFilter}
          onClearFilters={() => setFilters(NO_FILTERS)}
          activeCount={activeCount}
          savedOn={savedOnly}
          onToggleSaved={() => setSavedOnly((s) => !s)}
          favCount={favCount}
          profile={profile}
          onOpenProfile={() => setProfileOpen(true)}
        />
        <Main>{body}</Main>
      </Shell>

      <RecipeDrawer
        open={drawerOpen}
        recipe={openRecipe}
        onClose={() => setDrawerOpen(false)}
        favorite={!!(openRecipe && favorites[openRecipe.uri])}
        onToggleFavorite={toggleFavorite}
        copied={!!(openRecipe && copiedUri === openRecipe.uri)}
        onCopy={copyLink}
        profile={profile}
        review={(openRecipe && reviews[openRecipe.uri]) || null}
        onSaveReview={saveReview}
        onOpenProfile={() => { setDrawerOpen(false); setProfileOpen(true); }}
      />

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} profile={profile} onSave={setProfile} />
    </>
  );
}
