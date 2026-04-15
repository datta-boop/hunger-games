import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
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
  SearchComponent
} from "./components/headerComponent.styled.js";

import {
  RecipeListContainer,
  RecipeContainer,
  CoverImage,
  RecipeCardBody,
  RecipeName,
  RecipeButtonRow,
  IngredientsText,
  SeeMoreText
} from "./components/recipeComponent.styled.js";

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

  :hover {
    background: #6D28D9;
  }
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

  :hover {
    background: #F8FAFC;
    color: #0F172A;
  }
`;

const IngredientsImage = styled.img`
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

  tbody tr:last-child td {
    border-bottom: none;
  }
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;
  return (
    <>
      <Dialog
        open={show}
        onClose={() => setShow(false)}
        PaperProps={{
          style: { borderRadius: 12, maxWidth: 480, width: "100%" },
        }}
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
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr key={ingredientObj.text}>
                  <td style={{ width: 44 }}>
                    <IngredientsImage src={ingredientObj.image} alt={ingredientObj.text} />
                  </td>
                  <td>{ingredientObj.text}</td>
                  <td style={{ whiteSpace: "nowrap", color: "#94A3B8" }}>
                    {ingredientObj.weight.toFixed(0)}g
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
        <CoverImage src={recipeObj.image} alt={recipeObj.label} />
        <RecipeCardBody>
          <RecipeName>{recipeObj.label}</RecipeName>
        </RecipeCardBody>
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
};

const APP_ID = "ae900c5c";
const API_KEY = "7a3ea6b8845c6bb068398d477664b9bd";

function App() {
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);

  const fetchRecipe = async (searchInput) => {
    const response = await Axios.get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    updateRecipeList(response.data.hits);
  };

  const handleSearch = (e) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(e.target.value), 300);
    updateTimeoutId(timeout);
  };

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
            type="text"
            placeholder="Search recipes..."
            onChange={handleSearch}
          />
        </SearchComponent>
      </Header>

      <MainContent>
        {recipeList.length ? (
          <RecipeListContainer>
            {recipeList.map((recipeObj) => (
              <RecipeComponent key={recipeObj.recipe.uri} recipeObj={recipeObj.recipe} />
            ))}
          </RecipeListContainer>
        ) : (
          <EmptyState>
            <EmptyIcon src={pizzaLogo} alt="" />
            <EmptyHeading>Search for a recipe</EmptyHeading>
            <EmptySubtext>Type a food name above to get started</EmptySubtext>
          </EmptyState>
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
