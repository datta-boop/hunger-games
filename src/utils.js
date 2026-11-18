export const kcalOf = (r) =>
  r.calories && r.yield ? Math.round(r.calories / r.yield) : null;

export const nutrientOf = (r, key) => {
  const n = r.totalNutrients?.[key];
  return n && r.yield ? Math.round(n.quantity / r.yield) : null;
};

export const pad = (n) => String(n).padStart(2, "0");

export const sentence = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

export const greeting = () => {
  const h = new Date().getHours();
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};
