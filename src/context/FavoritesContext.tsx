/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface FavoritesContextValue {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { value: favoriteIds, setValue: setFavoriteIds } = useLocalStorage<
    string[]
  >("favoriteMealIds", []);

  // ✅ Stable callbacks

  const addFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );
    },
    [setFavoriteIds]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      setFavoriteIds((prev) => prev.filter((favId) => favId !== id));
    },
    [setFavoriteIds]
  );

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds]
  );

  // ✅ useMemo now depends on stable values
  const value = useMemo(
    () => ({ favoriteIds, addFavorite, removeFavorite, isFavorite }),
    [favoriteIds, addFavorite, removeFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return ctx;
};