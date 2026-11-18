export const APP_ID = "ae900c5c";
export const API_KEY = "7a3ea6b8845c6bb068398d477664b9bd";

export const FILTER_GROUPS = [
  {
    key: "meal",
    label: "Meal",
    options: ["Breakfast", "Lunch", "Dinner", "Snack"].map((l) => ({
      label: l,
      value: l.toLowerCase(),
    })),
  },
  {
    key: "diet",
    label: "Diet",
    options: [
      { label: "Vegan", value: "vegan" },
      { label: "Vegetarian", value: "vegetarian" },
      { label: "Gluten-free", value: "gluten-free" },
      { label: "Dairy-free", value: "dairy-free" },
      { label: "Keto", value: "keto-friendly" },
      { label: "Low-fat", value: "low-fat" },
    ],
  },
  {
    key: "kcal",
    label: "Calories per serving",
    options: [
      { label: "Under 300", value: 300 },
      { label: "Under 500", value: 500 },
      { label: "Under 800", value: 800 },
    ],
  },
  {
    key: "time",
    label: "Total time",
    options: [
      { label: "15 min", value: 15 },
      { label: "30 min", value: 30 },
      { label: "1 hour", value: 60 },
    ],
  },
];

export const SORT_OPTIONS = [
  { label: "Best match", value: "" },
  { label: "Calories", value: "calories" },
  { label: "Time", value: "time" },
  { label: "Ingredients", value: "ingredients" },
];

export const NOTABLE_LABELS = new Set([
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Dairy-Free",
  "Paleo",
  "Keto-Friendly",
  "Low-Fat",
  "Low-Carb",
]);

export const POPULAR_SEARCHES = ["Pasta", "Salad", "Chicken", "Smoothie", "Soup", "Tacos"];

export const AVATARS = ["🧑‍🍳", "👨‍🍳", "👩‍🍳", "🍕", "🍜", "🌮", "🥗", "🍣", "🧁", "🍱"];

export const LS = {
  favorites: "hg_favorites",
  recent: "hg_recent",
  profile: "hg_profile",
  reviews: "hg_reviews",
  view: "hg_view",
};
