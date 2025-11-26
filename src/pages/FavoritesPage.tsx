import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import type { Meal } from "./RandomMeal";

interface LookupResponse {
  meals: Meal[] | null;
}

const FavoriteMealCard = ({ id }: { id: string }) => {
  const { data, loading, error } = useFetch<LookupResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const { removeFavorite } = useFavorites();

  const meal = data?.meals?.[0] ?? null;

  if (loading)
    return (
      <div className="rounded-xl bg-slate-800 p-3 text-sm text-slate-300">
        Loading…
      </div>
    );

  if (error || !meal)
    return (
      <div className="rounded-xl bg-slate-800 p-3 text-sm text-red-300">
        Failed to load favorite.
      </div>
    );

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-3 flex flex-col sm:flex-row gap-3">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full sm:w-32 h-28 object-cover rounded-lg"
      />
      <div className="flex-1 space-y-2">
        <h2 className="text-sm font-semibold">{meal.strMeal}</h2>
        <p className="text-xs text-slate-300">
          {meal.strCategory} • {meal.strArea}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link
            to={`/recipe/${meal.idMeal}`}
            className="rounded-md bg-slate-700 px-3 py-1 text-xs hover:bg-slate-600"
          >
            View details
          </Link>
          <button
            onClick={() => removeFavorite(meal.idMeal)}
            className="rounded-md border border-red-400/70 px-3 py-1 text-xs text-red-200 hover:bg-red-500/20"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();

  if (favoriteIds.length === 0) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Favorites</h1>
        <p className="text-sm text-slate-300">
          You don’t have any favorite recipes yet. Head back to the{" "}
          <Link to="/" className="text-emerald-400 underline">
            Home page
          </Link>{" "}
          or try the{" "}
          <Link to="/random" className="text-emerald-400 underline">
            Random
          </Link>{" "}
          button to discover something tasty!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Favorites ({favoriteIds.length})
      </h1>

      <div className="grid gap-4">
        {favoriteIds.map((id) => (
          <FavoriteMealCard key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
