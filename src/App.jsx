import "./App.css";
import styled from "styled-components";
import { memo, useState, useRef, useEffect } from "react";
import { AiFillGithub, AiOutlineClose } from "react-icons/ai";
import { FiClock, FiUsers, FiZap } from "react-icons/fi";
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

  strong { color: #64748B; font-weight: 600; }

  @media (max-width: 640px) { padding: 12px 20px 0; }
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

const NOTABLE_LABELS = new Set([
  "Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free",
  "Paleo", "Keto-Friendly", "Low-Fat", "Low-Carb",
]);

// ——— RecipeComponent ———

const RecipeComponent = memo(({ recipeObj }) => {
  const [show, setShow] = useState(false);

  const calories =
    recipeObj.calories && recipeObj.yield
      ? Math.round(recipeObj.calories / recipeObj.yield)
      : null;

  const badges = (recipeObj.healthLabels || [])
    .filter((l) => NOTABLE_LABELS.has(l))
    .slice(0, 3);

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
          Ingredients
        </DialogTitle>
        <DialogContent>
          <DialogTable>
            <thead>
              <tr>
                <th></th>
                <th>Ingredient</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ing) => (
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

      <RecipeContainer>
        <CoverImage src={recipeObj.image} alt={recipeObj.label} loading="lazy" />
        <RecipeCardBody>
          <RecipeName>{recipeObj.label}</RecipeName>
          <RecipeMeta>
            {calories && (
              <MetaItem>
                <FiZap size={11} /> {calories} kcal
              </MetaItem>
            )}
            {recipeObj.totalTime > 0 && (
              <MetaItem>
                <FiClock size={11} /> {recipeObj.totalTime} min
              </MetaItem>
            )}
            {recipeObj.yield > 0 && (
              <MetaItem>
                <FiUsers size={11} /> {recipeObj.yield} srv
              </MetaItem>
            )}
          </RecipeMeta>
          {recipeObj.source && (
            <RecipeSource>from {recipeObj.source}</RecipeSource>
          )}
        </RecipeCardBody>
        {badges.length > 0 && (
          <DietBadges>
            {badges.map((badge) => (
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
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mealType, setMealType] = useState("");
  const [diet, setDiet] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      updateRecipeList([]);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      updateRecipeList([]);

      let url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchQuery)}&app_id=${APP_ID}&app_key=${API_KEY}`;
      if (mealType) url += `&mealType=${encodeURIComponent(mealType.toLowerCase())}`;
      if (diet)     url += `&health=${encodeURIComponent(diet)}`;

      try {
        const response = await Axios.get(url, { signal: controller.signal });
        updateRecipeList(response.data.hits);
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
  }, [searchQuery, mealType, diet, retryKey]);

  const handleClear = () => {
    setSearchQuery("");
    updateRecipeList([]);
    setError(null);
    if (inputRef.current) inputRef.current.focus();
  };

  const toggleMealType = (type) =>
    setMealType((prev) => (prev === type ? "" : type));

  const toggleDiet = (value) =>
    setDiet((prev) => (prev === value ? "" : value));

  const hasResults = recipeList.length > 0;
  const isSearching = searchQuery.trim().length > 0;
  const noResults = !loading && !error && isSearching && !hasResults;
  const showInitial = !isSearching && !loading;

  const activeDietLabel = DIET_FILTERS.find((d) => d.value === diet)?.label;

  return (
    <Container>
      <Header>
        <AppNameComponent>
          <img src={pizzaLogo} alt="logo" />
          Food Finder
        </AppNameComponent>
        <SearchComponent>
          <img src={searchLogo} alt="" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ClearButton onClick={handleClear} aria-label="Clear search">
              <AiOutlineClose size={14} />
            </ClearButton>
          )}
        </SearchComponent>
      </Header>

      <FilterBar>
        <FilterGroup>
          <FilterLabel>Meal</FilterLabel>
          <FilterPills>
            {MEAL_TYPES.map((type) => (
              <FilterPill
                key={type}
                $active={mealType === type}
                onClick={() => toggleMealType(type)}
              >
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
              <FilterPill
                key={value}
                $active={diet === value}
                onClick={() => toggleDiet(value)}
              >
                {label}
              </FilterPill>
            ))}
          </FilterPills>
        </FilterGroup>
      </FilterBar>

      <MainContent>
        {error ? (
          <ErrorState>
            <ErrorHeading>Something went wrong</ErrorHeading>
            <ErrorSubtext>{error}</ErrorSubtext>
            <RetryButton onClick={() => setRetryKey((k) => k + 1)}>
              Try again
            </RetryButton>
          </ErrorState>
        ) : showInitial ? (
          <EmptyState>
            <EmptyIcon src={pizzaLogo} alt="" />
            <EmptyHeading>Search for a recipe</EmptyHeading>
            <EmptySubtext>Type a food name above to get started</EmptySubtext>
          </EmptyState>
        ) : noResults ? (
          <EmptyState>
            <EmptyIcon src={pizzaLogo} alt="" />
            <EmptyHeading>No results for &ldquo;{searchQuery}&rdquo;</EmptyHeading>
            <EmptySubtext>
              Try a different search term or adjust your filters
            </EmptySubtext>
          </EmptyState>
        ) : (
          <>
            {hasResults && !loading && (
              <ResultsBar>
                Showing <strong>{recipeList.length}</strong> results for &ldquo;
                <strong>{searchQuery}</strong>&rdquo;
                {mealType && ` · ${mealType}`}
                {activeDietLabel && ` · ${activeDietLabel}`}
              </ResultsBar>
            )}
            <RecipeListContainer>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <RecipeSkeletonCard key={i} />
                  ))
                : recipeList.map((recipeObj) => (
                    <RecipeComponent
                      key={recipeObj.recipe.uri}
                      recipeObj={recipeObj.recipe}
                    />
                  ))}
            </RecipeListContainer>
          </>
        )}
      </MainContent>

      <Footer>
        <a
          href="https://github.com/datta-boop"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub size={16} />
          <h4>@datta-boop</h4>
        </a>
      </Footer>
    </Container>
  );
}

export default App;
