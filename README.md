# Datta's Recipebook

A recipe search app with a dark, editorial "after-hours kitchen" look and a matching light theme. Search any dish or ingredient, narrow it by diet, calories and time, save the keepers, and leave your own reviews.

Recipe data comes from the [Edamam Recipe Search API](https://developer.edamam.com/edamam-recipe-api).

## Features

**Search and filter**
- Live search with a debounce, recent searches and popular starting points
- Filter by meal, diet, calories per serving and total time
- Sort by best match, calories, time or number of ingredients
- Load more results; shareable links through a `?q=` URL parameter
- Press `/` anywhere to jump to the search box

**Browse**
- Numbered index list with a kcal / minutes / ingredients column, or an image-led gallery (your choice is remembered)
- Recipe drawer with a tickable ingredient checklist, a macro breakdown per serving and a link to the original recipe
- Copy a recipe link in one tap

**Make it yours**
- Save favourites and find them under **Saved recipes**
- Create a profile (emoji avatar and display name) and leave a star rating and note on any recipe
- Dark and light themes: follows your device by default, with a switch in the sidebar that remembers your choice

All personal data (favourites, reviews, profile, recent searches, layout and theme) is stored in your browser's `localStorage`. Nothing is sent to a server, and it does not sync across devices.

## Tech stack

- [React](https://react.dev) 18, built with Create React App
- [styled-components](https://styled-components.com) for styling, with CSS custom properties for theming
- [Material UI](https://mui.com) for the drawer and dialog behaviour (focus trapping, escape to close)
- [react-icons](https://react-icons.github.io/react-icons/) (Feather set) and [Axios](https://axios-http.com)
- Fonts: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) and [DM Mono](https://fonts.google.com/specimen/DM+Mono)

## Getting started

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm start`     | Start the development server                  |
| `npm run build` | Create an optimised production build in `build/` |
| `npm test`      | Run the test runner                           |

## Project structure

```
src/
  App.jsx                 App state, search, filtering and page layout
  constants.js            Filters, sort options, API credentials, storage keys
  utils.js                Nutrition helpers and small formatters
  hooks/
    useStored.js          useState backed by localStorage
    useTheme.js           Light/dark theme: device default plus manual override
  styles/global.js        Theme tokens (dark and light) and global styles
  components/
    Sidebar.jsx           Search, suggestions, filters, saved, profile, theme switch
    RecipeItems.jsx       List row, gallery tile and loading skeletons
    RecipeDrawer.jsx      Ingredients, nutrition and review tabs
    ProfileModal.jsx      Avatar and display name
    StarRating.jsx, Logo.jsx, ui.js
public/
  index.html              Fonts, theme-colour meta and the no-flash theme script
  noise.svg               Grain texture used by the global styles
```

## Theming

Colours live in CSS custom properties in `src/styles/global.js`. The dark palette is the default; the light palette applies when the device prefers light, or when the user picks it with the switch (stored as `data-theme` on the `<html>` element). To retheme the app, change the tokens there. Components use the tokens rather than hardcoded colours.

## Deployment

The site is deployed on [Netlify](https://www.netlify.com). `netlify.toml` sets the build command (`npm run build`), the publish directory (`build`) and a single-page-app redirect. Pushes to `main` deploy to production, and every pull request gets a deploy preview.

## Configuration note

The Edamam `APP_ID` and `API_KEY` are set in `src/constants.js` and ship in the client bundle, as with any key used directly from the browser. If you fork this project, get your own free keys from Edamam and replace them.
