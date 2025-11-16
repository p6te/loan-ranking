import { useEffect, useState } from "react";

export const screens = {
  base: "(max-width: 639px)",
  sm: "(max-width: 767px)",
  md: "(max-width: 1023px)",
  lg: "(max-width: 1279px)",
  xl: "(max-width: 1535px)",
  "2xl": "(min-width: 1536px)",
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};
