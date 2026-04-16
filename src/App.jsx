import "./App.css";
import styled from "styled-components";
import { memo, useState, useRef, useEffect, useMemo } from "react";
import { AiFillGithub, AiOutlineClose, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiClock, FiUsers, FiZap, FiCopy, FiCheck } from "react-icons/fi";
import pizzaLogo from "./assets/pizza.png";
import searchLogo from "./assets/search.svg";

import Axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import { Footer } from "./components/footerComponent.styled.js";
import {
  Header,
  AppNameComponent,
  SearchComponent,
} from "./components/headerComponent.styled.js";
import {
  FilterBar,
  FilterGroup,
  FilterLabel,
  FilterPills,
  FilterPill,
  FilterDivider,
} from "./components/filterComponent.styled.js";
import {
  RecipeListContainer,
  RecipeContainer,
  CardImageWrapper,
  FavoriteBtn,
  CoverImage,
  RecipeCardBody,
  RecipeName,
  RecipeMeta,
  MetaItem,
  RecipeSource,
  DietBadges,
  DietBadge,
  RecipeButtonRow,
  IngredientsText,
  SeeMoreText,
  CopyBtn,
  SkeletonCard,
  SkeletonImage,
  SkeletonBody,
  SkeletonLine,
  SkeletonButtons,
  SkeletonButton,
} from "./components/recipeComponent.styled.js";

// ——— Local styled components ———

const Container = styled.div`
  min-height: 100vh;
  background: #F8FAFC;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 10px;
`;

const EmptyIcon = styled.img`
  width: 56px;
  height: 56px;
  opacity: 0.12;
  margin-bottom: 4px;
`;

const EmptyHeading = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #64748B;
  margin: 0;
`;

const EmptySubtext = styled.p`
  font-size: 14px;
  color: #94A3B8;
  margin: 0;
  text-align: center;
`;

const PopularChipsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 8px;
`;

const PopularChip = styled.button`
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  padding: 5px 14px;
  border-radius: 9999px;
  cursor: pointer;
  border: 1.5px solid #E2E8F0;
  background: #ffffff;
  color: #64748B;
  transition: all 0.15s ease;

  &:hover {
    border-color: #7C3AED;
    color: #7C3AED;
  }
`;

const ErrorState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 10px;
`;

const ErrorHeading = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #64748B;
  margin: 0;
`;

const ErrorSubtext = styled.p`
  font-size: 14px;
  color: #94A3B8;
  margin: 0;
`;

const RetryButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  background: #7C3AED;
  color: #ffffff;
  border: none;
  margin-top: 4px;
  transition: background 0.15s ease;

  &:hover { background: #6D28D9; }
`;

const ResultsBar = styled.div`
  padding: 16px 40px 0;
  font-size: 13px;
  color: #94A3B8;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  strong { color: #64748B; font-weight: 600; }

  @media (max-width: 640px) { padding: 12px 20px 0; }
`;

const ResultsCount = styled.span`
  flex: 1;
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`;

const SortLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  white-space: nowrap;
`;

const SortPill = styled.button`
  font-size: 12px;
  font-weight: 500;
  font-family: inherit;
  padding: 3px 10px;
  border-radius: 9999px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
  background: ${props => props.$active ? '#7C3AED' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#64748B'};
  border: 1.5px solid ${props => props.$active ? '#7C3AED' : '#E2E8F0'};

  &:hover {
    ${props => !props.$active && 'border-color: #7C3AED; color: #7C3AED;'}
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #CBD5E1;
  display: flex;
  align-items: center;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.15s ease;

  &:hover { color: #94A3B8; }
`;

const LoadMoreButton = styled.button`
  display: block;
  margin: 0 auto 40px;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  padding: 10px 28px;
  border-radius: 9999px;
  cursor: pointer;
  background: #ffffff;
  color: #64748B;
  border: 1.5px solid #E2E8F0;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: #7C3AED;
    color: #7C3AED;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryDialogButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  background: #7C3AED;
  color: #ffffff;
  border: none;
  transition: background 0.15s ease;
  &:hover { background: #6D28D9; }
`;

const SecondaryDialogButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
  color: #64748B;
  border: 1px solid #E2E8F0;
  transition: background 0.15s ease, color 0.15s ease;
  &:hover { background: #F8FAFC; color: #0F172A; }
`;

const IngredientImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

const DialogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-transform: capitalize;

  th {
    font-weight: 600;
    color: #64748B;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0 12px 10px;
    border-bottom: 1px solid #E2E8F0;
    text-align: left;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #F1F5F9;
    vertical-align: middle;
    font-size: 14px;
    color: #374151;
  }

  tbody tr:last-child td { border-bottom: none; }
`;

const NutriRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 14px 16px;
  background: #F8FAFC;
  border-bottom: 1px solid #E2E8F0;
  flex-wrap: wrap;
`;

const NutriItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
  min-width: 52px;
`;

const NutriValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #0F172A;
`;

const NutriLabel = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SuggestionsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  z-index: 200;
  overflow: hidden;
  padding: 6px 0;
  min-width: 260px;
`;

const SuggestionSectionLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #94A3B8;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 8px 14px 4px;
`;

const SuggestionItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  color: #374151;
  padding: 7px 14px;
  transition: background 0.1s ease;

  &:hover { background: #F8FAFC; }
`;

const SuggestionDivider = styled.div`
  height: 1px;
  background: #F1F5F9;
  margin: 4px 0;
`;

// ——— Constants ———

const APP_ID = "ae900c5c";
const API_KEY = "7a3ea6b8845c6bb068398d477664b9bd";

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

const DIET_FILTERS = [
  { label: "Vegan",        value: "vegan" },
  { label: "Vegetarian",  value: "vegetarian" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Dairy-Free",  value: "dairy-free" },
  { label: "Keto",        value: "keto-friendly" },
  { label: "Low-Fat",     value: "low-fat" },
];

const CALORIE_FILTERS = [
  { label: "< 300 kcal", value: "lt300", limit: 300 },
  { label: "< 500 kcal", value: "lt500", limit: 500 },
  { label: "< 800 kcal", value: "lt800", limit: 800 },
];

const TIME_FILTERS = [
  { label: "< 15 min", value: "lt15", limit: 15 },
  { label: "< 30 min", value: "lt30", limit: 30 },
  { label: "< 60 min", value: "lt60", limit: 60 },
];

const SORT_OPTIONS = [
  { label: "Calories",     value: "calories" },
  { label: "Time",         value: "time" },
  { label: "Ingredients",  value: "ingredients" },
];

const NOTABLE_LABELS = new Set([
  "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free",
  "Paleo", "Keto-Friendly", "Low-Fat", "Low-Carb",
]);

const POPULAR_SEARCHES = ["Pasta", "Salad", "Chicken", "Smoothie", "Soup", "Tacos"];

const LS_FAVORITES = "hg_favorites";
const LS_RECENT    = "hg_recent";

// ——— RecipeComponent ———

const RecipeComponent = memo(({ recipeObj, index, isFavorite, onToggleFavorite, copied, onCopy }) => {
  const [show, setShow] = useState(false);

  const calories =
    recipeObj.calories && recipeObj.yield
      ? Math.round(recipeObj.calories / recipeObj.yield)
      : null;

  const badges = (recipeObj.healthLabels || [])
    .filter(l => NOTABLE_LABELS.has(l))
    .slice(0, 3);

  const getNutrient = (key) => {
    const n = recipeObj.totalNutrients?.[key];
    return n && recipeObj.yield ? Math.round(n.quantity / recipeObj.yield) : null;
  };

  const protein = getNutrient("PROCNT");
  const carbs   = getNutrient("CHOCDF");
  const fat     = getNutrient("FAT");
  const fiber   = getNutrient("FIBTG");
  const hasNutri = protein !== null || carbs !== null || fat !== null;

  return (
    <>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        PaperProps={{ style: { borderRadius: 12, maxWidth: 480, width: "100%" } }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#0F172A",
            letterSpacing: "-0.02em",
            paddingBottom: "4px",
          }}
        >
          {recipeObj.label}
        </DialogTitle>
        <DialogContent sx={{ padding: "0 !important" }}>
          {hasNutri && (
            <NutriRow>
              {calories !== null && (
                <NutriItem>
                  <NutriValue>{calories}</NutriValue>
                  <NutriLabel>kcal</NutriLabel>
                </NutriItem>
              )}
              {protein !== null && (
                <NutriItem>
                  <NutriValue>{protein}g</NutriValue>
                  <NutriLabel>Protein</NutriLabel>
                </NutriItem>
              )}
              {carbs !== null && (
                <NutriItem>
                  <NutriValue>{carbs}g</NutriValue>
                  <NutriLabel>Carbs</NutriLabel>
                </NutriItem>
              )}
              {fat !== null && (
                <NutriItem>
                  <NutriValue>{fat}g</NutriValue>
                  <NutriLabel>Fat</NutriLabel>
                </NutriItem>
              )}
              {fiber !== null && (
                <NutriItem>
                  <NutriValue>{fiber}g</NutriValue>
                  <NutriLabel>Fiber</NutriLabel>
                </NutriItem>
              )}
            </NutriRow>
          )}
          <div style={{ padding: "0 4px" }}>
            <DialogTable>
              <thead>
                <tr>
                  <th></th>
                  <th>Ingredient</th>
                  <th>Weight</th>
                </tr>
              </thead>
              <tbody>
                {recipeObj.ingredients.map(ing => (
                  <tr key={ing.text}>
                    <td style={{ width: 44 }}>
                      <IngredientImage src={ing.image} alt={ing.text} loading="lazy" />
                    </td>
                    <td>{ing.text}</td>
                    <td style={{ whiteSpace: "nowrap", color: "#94A3B8" }}>
                      {ing.weight.toFixed(0)}g
                    </td>
                  </tr>
                ))}
              </tbody>
            </DialogTable>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "12px 20px 16px", gap: "8px" }}>
          <PrimaryDialogButton onClick={() => window.open(recipeObj.url)}>
            View Full Recipe
          </PrimaryDialogButton>
          <SecondaryDialogButton onClick={() => setShow(false)}>
            Close
          </SecondaryDialogButton>
        </DialogActions>
      </Dialog>

      <RecipeContainer $index={index}>
        <CardImageWrapper>
          <CoverImage src={recipeObj.image} alt={recipeObj.label} loading="lazy" />
          <FavoriteBtn
            $active={isFavorite}
            onClick={() => onToggleFavorite(recipeObj)}
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
          >
            {isFavorite ? <AiFillHeart size={14} /> : <AiOutlineHeart size={14} />}
          </FavoriteBtn>
        </CardImageWrapper>
        <RecipeCardBody>
          <RecipeName>{recipeObj.label}</RecipeName>
          <RecipeMeta>
            {calories && (
              <MetaItem><FiZap size={11} /> {calories} kcal</MetaItem>
            )}
            {recipeObj.totalTime > 0 && (
              <MetaItem><FiClock size={11} /> {recipeObj.totalTime} min</MetaItem>
            )}
            {recipeObj.yield > 0 && (
              <MetaItem><FiUsers size={11} /> {recipeObj.yield} srv</MetaItem>
            )}
          </RecipeMeta>
          {recipeObj.source && (
            <RecipeSource>from {recipeObj.source}</RecipeSource>
          )}
        </RecipeCardBody>
        {badges.length > 0 && (
          <DietBadges>
            {badges.map(badge => (
              <DietBadge key={badge}>{badge}</DietBadge>
            ))}
          </DietBadges>
        )}
        <RecipeButtonRow>
          <IngredientsText onClick={() => setShow(true)}>
            Ingredients
          </IngredientsText>
          <SeeMoreText onClick={() => window.open(recipeObj.url)}>
            View Recipe
          </SeeMoreText>
          <CopyBtn
            $copied={copied}
            onClick={() => onCopy(recipeObj)}
            aria-label="Copy recipe link"
            title="Copy link"
          >
            {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
          </CopyBtn>
        </RecipeButtonRow>
      </RecipeContainer>
    </>
  );
});

// ——— Skeleton card ———

const RecipeSkeletonCard = () => (
  <SkeletonCard>
    <SkeletonImage />
    <SkeletonBody>
      <SkeletonLine $width="90%" />
      <SkeletonLine $width="65%" $height="12px" />
      <SkeletonLine $width="45%" $height="11px" />
    </SkeletonBody>
    <SkeletonButtons>
      <SkeletonButton />
      <SkeletonButton />
    </SkeletonButtons>
  </SkeletonCard>
);

// ——— App ———

function App() {
  const [searchQuery, setSearchQuery]     = useState("");
  const [recipeList, updateRecipeList]    = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);
  const [mealType, setMealType]           = useState("");
  const [diet, setDiet]                   = useState("");
  const [retryKey, setRetryKey]           = useState(0);
  const [nextPageUrl, setNextPageUrl]     = useState(null);
  const [loadingMore, setLoadingMore]     = useState(false);
  const [sortBy, setSortBy]               = useState("");
  const [calorieFilter, setCalorieFilter] = useState("");
  const [timeFilter, setTimeFilter]       = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSuggestions, setShowSuggestions]     = useState(false);
  const [copiedUri, setCopiedUri]         = useState(null);

  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_FAVORITES) || "{}"); }
    catch { return {}; }
  });

  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_RECENT) || "[]"); }
    catch { return []; }
  });

  const inputRef        = useRef(null);
  const searchWrapperRef = useRef(null);

  // ——— Press "/" to focus search ———
  useEffect(() => {
    const handler = (e) => {
      if (
        e.key === "/" &&
        document.activeElement !== inputRef.current &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ——— Close suggestions on outside click ———
  useEffect(() => {
    const handler = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ——— Main search effect ———
  useEffect(() => {
    if (showFavoritesOnly) return;
    if (!searchQuery.trim()) {
      updateRecipeList([]);
      setError(null);
      setLoading(false);
      setNextPageUrl(null);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      updateRecipeList([]);
      setNextPageUrl(null);

      let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchQuery)}&app_id=${APP_ID}&app_key=${API_KEY}`;
      if (mealType) url += `&mealType=${encodeURIComponent(mealType.toLowerCase())}`;
      if (diet)     url += `&health=${encodeURIComponent(diet)}`;

      try {
        const response = await Axios.get(url, { signal: controller.signal });
        updateRecipeList(response.data.hits);
        setNextPageUrl(response.data._links?.next?.href || null);

        const q = searchQuery.trim();
        setRecentSearches(prev => {
          const updated = [q, ...prev.filter(s => s.toLowerCase() !== q.toLowerCase())].slice(0, 5);
          localStorage.setItem(LS_RECENT, JSON.stringify(updated));
          return updated;
        });
      } catch (err) {
        if (Axios.isCancel(err) || err.code === "ERR_CANCELED") return;
        setError("Something went wrong. Please try again.");
        updateRecipeList([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchQuery, mealType, diet, retryKey, showFavoritesOnly]);

  // ——— Load more ———
  const handleLoadMore = async () => {
    if (!nextPageUrl || loadingMore) return;
    setLoadingMore(true);
    try {
      const response = await Axios.get(nextPageUrl);
      updateRecipeList(prev => [...prev, ...response.data.hits]);
      setNextPageUrl(response.data._links?.next?.href || null);
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false);
    }
  };

  // ——— Favorites ———
  const toggleFavorite = (recipe) => {
    setFavorites(prev => {
      const next = { ...prev };
      if (next[recipe.uri]) {
        delete next[recipe.uri];
      } else {
        next[recipe.uri] = recipe;
      }
      localStorage.setItem(LS_FAVORITES, JSON.stringify(next));
      return next;
    });
  };

  // ——— Copy link ———
  const handleCopy = (recipe) => {
    navigator.clipboard?.writeText(recipe.url).then(() => {
      setCopiedUri(recipe.uri);
      setTimeout(() => setCopiedUri(null), 1800);
    });
  };

  // ——— Search/filter helpers ———
  const handleClear = () => {
    setSearchQuery("");
    updateRecipeList([]);
    setError(null);
    setNextPageUrl(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const toggleMealType = (type)  => setMealType(prev  => prev === type  ? "" : type);
  const toggleDiet     = (value) => setDiet(prev      => prev === value ? "" : value);
  const toggleCalorie  = (value) => setCalorieFilter(prev => prev === value ? "" : value);
  const toggleTime     = (value) => setTimeFilter(prev    => prev === value ? "" : value);
  const toggleSort     = (value) => setSortBy(prev         => prev === value ? "" : value);

  const handleSuggestionClick = (term) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    setShowFavoritesOnly(false);
  };

  // ——— Computed display list (client-side filter + sort) ———
  const displayList = useMemo(() => {
    let list = showFavoritesOnly
      ? Object.values(favorites)
      : recipeList.map(h => h.recipe);

    if (calorieFilter) {
      const lim = CALORIE_FILTERS.find(f => f.value === calorieFilter)?.limit;
      if (lim) list = list.filter(r => {
        const c = r.calories && r.yield ? Math.round(r.calories / r.yield) : null;
        return c !== null && c < lim;
      });
    }

    if (timeFilter) {
      const lim = TIME_FILTERS.find(f => f.value === timeFilter)?.limit;
      if (lim) list = list.filter(r => r.totalTime > 0 && r.totalTime <= lim);
    }

    if (sortBy === "calories") {
      list = [...list].sort((a, b) => {
        const ca = a.calories && a.yield ? a.calories / a.yield : Infinity;
        const cb = b.calories && b.yield ? b.calories / b.yield : Infinity;
        return ca - cb;
      });
    } else if (sortBy === "time") {
      list = [...list].sort((a, b) => (a.totalTime || Infinity) - (b.totalTime || Infinity));
    } else if (sortBy === "ingredients") {
      list = [...list].sort((a, b) => (a.ingredients?.length || 0) - (b.ingredients?.length || 0));
    }

    return list;
  }, [recipeList, showFavoritesOnly, favorites, calorieFilter, timeFilter, sortBy]);

  // ——— Display state logic ———
  const hasResults  = displayList.length > 0;
  const isSearching = searchQuery.trim().length > 0;
  const noResults   = !loading && !error && (isSearching || showFavoritesOnly) && !hasResults;
  const showInitial = !isSearching && !loading && !showFavoritesOnly;

  const activeDietLabel = DIET_FILTERS.find(d => d.value === diet)?.label;
  const favCount        = Object.keys(favorites).length;
  const showDropdown    = showSuggestions && (recentSearches.length > 0 || POPULAR_SEARCHES.length > 0);

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <img src={pizzaLogo} alt="logo" />
          Food Finder
        </AppNameComponent>
        <SearchWrapper ref={searchWrapperRef}>
          <SearchComponent>
            <img src={searchLogo} alt="" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search recipes… (press / to focus)"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowFavoritesOnly(false); }}
              onFocus={() => setShowSuggestions(true)}
            />
            {searchQuery && (
              <ClearButton onClick={handleClear} aria-label="Clear search">
                <AiOutlineClose size={14} />
              </ClearButton>
            )}
          </SearchComponent>

          {showDropdown && (
            <SuggestionsDropdown>
              {recentSearches.length > 0 && (
                <>
                  <SuggestionSectionLabel>Recent</SuggestionSectionLabel>
                  {recentSearches.map(term => (
                    <SuggestionItem key={term} onMouseDown={() => handleSuggestionClick(term)}>
                      <FiClock size={12} style={{ color: "#94A3B8", flexShrink: 0 }} />
                      {term}
                    </SuggestionItem>
                  ))}
                  <SuggestionDivider />
                </>
              )}
              <SuggestionSectionLabel>Popular</SuggestionSectionLabel>
              {POPULAR_SEARCHES.map(term => (
                <SuggestionItem key={term} onMouseDown={() => handleSuggestionClick(term)}>
                  <FiZap size={12} style={{ color: "#94A3B8", flexShrink: 0 }} />
                  {term}
                </SuggestionItem>
              ))}
            </SuggestionsDropdown>
          )}
        </SearchWrapper>
      </Header>

      <FilterBar>
        <FilterGroup>
          <FilterLabel>Meal</FilterLabel>
          <FilterPills>
            {MEAL_TYPES.map(type => (
              <FilterPill key={type} $active={mealType === type} onClick={() => toggleMealType(type)}>
                {type}
              </FilterPill>
            ))}
          </FilterPills>
        </FilterGroup>

        <FilterDivider />

        <FilterGroup>
          <FilterLabel>Diet</FilterLabel>
          <FilterPills>
            {DIET_FILTERS.map(({ label, value }) => (
              <FilterPill key={value} $active={diet === value} onClick={() => toggleDiet(value)}>
                {label}
              </FilterPill>
            ))}
          </FilterPills>
        </FilterGroup>

        <FilterDivider />

        <FilterGroup>
          <FilterLabel>Kcal</FilterLabel>
          <FilterPills>
            {CALORIE_FILTERS.map(({ label, value }) => (
              <FilterPill key={value} $active={calorieFilter === value} onClick={() => toggleCalorie(value)}>
                {label}
              </FilterPill>
            ))}
          </FilterPills>
        </FilterGroup>

        <FilterDivider />

        <FilterGroup>
          <FilterLabel>Time</FilterLabel>
          <FilterPills>
            {TIME_FILTERS.map(({ label, value }) => (
              <FilterPill key={value} $active={timeFilter === value} onClick={() => toggleTime(value)}>
                {label}
              </FilterPill>
            ))}
          </FilterPills>
        </FilterGroup>

        <FilterDivider />

        <FilterGroup>
          <FilterPill
            $active={showFavoritesOnly}
            onClick={() => { setShowFavoritesOnly(prev => !prev); setShowSuggestions(false); }}
          >
            Saved{favCount > 0 ? ` (${favCount})` : ""}
          </FilterPill>
        </FilterGroup>
      </FilterBar>

      <MainContent>
        {error ? (
          <ErrorState>
            <ErrorHeading>Something went wrong</ErrorHeading>
            <ErrorSubtext>{error}</ErrorSubtext>
            <RetryButton onClick={() => setRetryKey(k => k + 1)}>Try again</RetryButton>
          </ErrorState>
        ) : showInitial ? (
          <EmptyState>
            <EmptyIcon src={pizzaLogo} alt="" />
            <EmptyHeading>Search for a recipe</EmptyHeading>
            <EmptySubtext>Type a food name above to get started</EmptySubtext>
            <PopularChipsRow>
              {POPULAR_SEARCHES.map(term => (
                <PopularChip key={term} onClick={() => setSearchQuery(term)}>
                  {term}
                </PopularChip>
              ))}
            </PopularChipsRow>
          </EmptyState>
        ) : noResults ? (
          <EmptyState>
            <EmptyIcon src={pizzaLogo} alt="" />
            <EmptyHeading>
              {showFavoritesOnly ? "No saved recipes yet" : `No results for \u201c${searchQuery}\u201d`}
            </EmptyHeading>
            <EmptySubtext>
              {showFavoritesOnly
                ? "Heart a recipe to save it here"
                : "Try a different search term or adjust your filters"}
            </EmptySubtext>
          </EmptyState>
        ) : (
          <>
            {hasResults && !loading && (
              <ResultsBar>
                <ResultsCount>
                  Showing <strong>{displayList.length}</strong>
                  {showFavoritesOnly
                    ? " saved recipes"
                    : <> results for &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
                  {mealType && ` · ${mealType}`}
                  {activeDietLabel && ` · ${activeDietLabel}`}
                </ResultsCount>
                <SortRow>
                  <SortLabel>Sort</SortLabel>
                  {SORT_OPTIONS.map(({ label, value }) => (
                    <SortPill key={value} $active={sortBy === value} onClick={() => toggleSort(value)}>
                      {label}
                    </SortPill>
                  ))}
                </SortRow>
              </ResultsBar>
            )}

            <RecipeListContainer>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => <RecipeSkeletonCard key={i} />)
                : displayList.map((recipe, i) => (
                    <RecipeComponent
                      key={recipe.uri}
                      recipeObj={recipe}
                      index={i}
                      isFavorite={!!favorites[recipe.uri]}
                      onToggleFavorite={toggleFavorite}
                      copied={copiedUri === recipe.uri}
                      onCopy={handleCopy}
                    />
                  ))}
            </RecipeListContainer>

            {!loading && nextPageUrl && !showFavoritesOnly && (
              <LoadMoreButton onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? "Loading…" : "Load more recipes"}
              </LoadMoreButton>
            )}
          </>
        )}
      </MainContent>

      <Footer>
        <a href="https://github.com/datta-boop" target="_blank" rel="noreferrer">
          <AiFillGithub size={16} />
          <h4>@datta-boop</h4>
        </a>
      </Footer>
    </Container>
  );
}

export default App;
