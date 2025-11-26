import { useMemo } from "react";
import { useFetch } from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strMealThumb: string;
  strInstructions: string;
}

interface RandomMealResponse {
  meals: Meal[];
}

const RANDOM_MEAL_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

const RandomMeal = () => {
  // ✅ Fetch hook
  const { data, loading, error, refetch } =
    useFetch<RandomMealResponse>(RANDOM_MEAL_URL);

  const meal: Meal | null = useMemo(
    () => (data?.meals && data.meals.length > 0 ? data.meals[0] : null),
    [data]
  );

  // ✅ Favorites context (global state)
  const { favoriteIds, addFavorite, removeFavorite, isFavorite } =
    useFavorites();

  const isCurrentFavorite = meal ? isFavorite(meal.idMeal) : false;

  const handleToggleFavorite = () => {
    if (!meal) return;
    if (isCurrentFavorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-800 shadow-lg p-6 space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">🍽 Random Meal (TheMealDB)</h1>
            <p className="text-xs text-slate-300">
              Favorites saved globally • {favoriteIds.length} total
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refetch}
              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Loading..." : "Get another"}
            </button>
          </div>
        </header>

        {/* Loading state */}
          {loading && <Spinner label="Fetching delicious ideas…" fullHeight />}

{!loading && error && <ErrorMessage message={error} />}

        {/* Current meal */}
        {!loading && !error && meal && (
          <article className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="h-32 w-32 md:h-40 md:w-40 rounded-lg object-cover shadow-md"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                    <p className="text-sm text-slate-300">
                      <span className="font-medium">
                        {meal.strCategory || "Unknown category"}
                      </span>{" "}
                      • {meal.strArea || "Unknown area"}
                    </p>
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      isCurrentFavorite
                        ? "bg-pink-500 text-slate-900 hover:bg-pink-400"
                        : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                    }`}
                    disabled={!meal}
                  >
                    {isCurrentFavorite ? "★ Favorited" : "☆ Add to favorites"}
                  </button>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {meal.strInstructions.slice(0, 220)}…
                </p>
              </div>
            </div>
          </article>
        )}

        {/* Fallback if no meal and no error */}
        {!loading && !error && !meal && (
          <p className="text-sm text-slate-300">
            No meal to show yet. Try fetching again.
          </p>
        )}

        {/* Tiny debug/preview of favorite IDs – optional but shows global state */}
        {favoriteIds.length > 0 && (
          <section className="border-t border-slate-700 pt-4">
            <h3 className="text-sm font-semibold mb-1">
              Favorite IDs ({favoriteIds.length})
            </h3>
            <p className="text-xs text-slate-300 break-all">
              {favoriteIds.join(", ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default RandomMeal;
