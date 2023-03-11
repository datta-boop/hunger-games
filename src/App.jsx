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
  RecipeName,
  IngredientsText,
  SeeMoreText
} from "./components/recipeComponent.styled.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-color: #b0e0e6;
  box-sizing: border-box;
`;

const Placeholder = styled.img`
  width: 200px;
  height: 200px;
  margin: 149px;
  opacity: 50%;
`;

const DialogButton = styled.button`
  font-size: 18px;
  border: solid 2px #13274f;
  padding: 5px;
  font-weight: bold;
  color: #13274f;
  border-radius: 6px;
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;
const IngredientsImage = styled.img`
  width: 40px;
  border-radius: 50%;
  padding: 5px;
`;
const DialogTable = styled.table`
  text-align: center;
  text-transform: capitalize;
  font-weight: 500;
  color: #13274f;
`;

const RecipeComponent = (props) => {
  const [show, setShow] = useState(false);
  const { recipeObj } = props;
  return (
    <>
      <Dialog open={show}>
        <DialogTitle align="center" variant="h4" sx={{ color: "#13274F" }}>
          How to cook this?
        </DialogTitle>
        <DialogContent>
          <DialogTable>
            <tr>
              <th>Image</th>
              <th>Ingredients</th>
              <th>Weight</th>
            </tr>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj) => (
                <tr>
                  <td>
                    <IngredientsImage src={ingredientObj.image} />
                  </td>
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </DialogTable>
        </DialogContent>
        <DialogActions>
          <DialogButton onClick={() => window.open(recipeObj.url)}>
            See More
          </DialogButton>
          <DialogButton onClick={() => setShow(false)}>Close</DialogButton>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <CoverImage src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <div>
          <IngredientsText onClick={() => setShow(true)}>
            Ingredients
          </IngredientsText>
          <SeeMoreText onClick={() => window.open(recipeObj.url)}>
            Complete Recipe
          </SeeMoreText>
        </div>
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
    <Container className="App">
      <Header>
        <AppNameComponent>
          <img src={pizzaLogo} alt="logo" />
          Food Finder
        </AppNameComponent>
        <SearchComponent>
          <img src={searchLogo} alt="background-logo" />
          <input
            type="text"
            placeholder="Type A Food Name"
            onChange={handleSearch}
          />
        </SearchComponent>
      </Header>
      <RecipeListContainer>
        {recipeList.length ? (
          recipeList.map((recipeObj) => (
            <RecipeComponent recipeObj={recipeObj.recipe} />
          ))
        ) : (
          <Placeholder src={pizzaLogo} />
        )}
      </RecipeListContainer>
      <Footer>
        <a href="/https://github.com/datta-boop">
          <AiFillGithub size={25} />
          <h4>@datta-boop</h4>
        </a>
      </Footer>
    </Container>
  );
}

export default App;
