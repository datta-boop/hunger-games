import { useState, useEffect, useCallback } from "react";
import { useStored } from "./useStored";
import { LS } from "../constants";

const QUERY = "(prefers-color-scheme: light)";

export function useTheme() {
  const [stored, setStored] = useStored(LS.theme, null);
  const [systemLight, setSystemLight] = useState(() => window.matchMedia?.(QUERY).matches ?? false);

  useEffect(() => {
    const mq = window.matchMedia?.(QUERY);
    if (!mq) return;
    const onChange = (e) => setSystemLight(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (stored) root.dataset.theme = stored;
    else delete root.dataset.theme;
  }, [stored]);

  const theme = stored ?? (systemLight ? "light" : "dark");

  const toggle = useCallback(() => {
    const freeze = document.createElement("style");
    freeze.textContent = "*,*::before,*::after{transition:none !important}";
    document.head.appendChild(freeze);
    setStored(theme === "light" ? "dark" : "light");
    void document.body.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => freeze.remove()));
  }, [theme, setStored]);

  return [theme, toggle];
}
