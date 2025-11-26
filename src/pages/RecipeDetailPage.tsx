import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import type { Meal } from "./RandomMeal";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

type MealWithDynamicFields = Meal & Record<string, string | null>;

interface LookupResponse {
  meals: Meal[] | null;
}

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
    recipeId ?? ""
  }`;

  const { data, loading, error } = useFetch<LookupResponse>(url);

  const meal = data?.meals?.[0] ?? null;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = meal ? isFavorite(meal.idMeal) : false;

  const handleToggleFavorite = () => {
    if (!meal) return;
    if (isFav) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  // Build ingredients list from dynamic fields
  const ingredients =
    meal &&
    ((): { ingredient: string; measure: string }[] => {
      const result: { ingredient: string; measure: string }[] = [];
      const mealWithDynamic = meal as MealWithDynamicFields;

      for (let i = 1; i <= 20; i++) {
       const ingredient = mealWithDynamic[`strIngredient${i}`];
        const measure = mealWithDynamic[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
          result.push({
            ingredient: ingredient.trim(),
            measure: measure?.trim() ?? "",
          });
        }
      }
      return result;
    })();

  return (
    <div className="space-y-4">
      {loading && <Spinner label="Loading recipe…" />}

      {error && <ErrorMessage title="Failed to load recipe" message={error} />}

      {!loading && !error && !meal && (
        <p className="text-sm text-slate-300">Recipe not found.</p>
      )}

      {!loading && !error && meal && (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full md:w-72 h-60 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-semibold">{meal.strMeal}</h1>
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
                    isFav
                      ? "bg-pink-500 text-slate-900 hover:bg-pink-400"
                      : "bg-slate-700 text-slate-100 hover:bg-slate-600"
                  }`}
                >
                  {isFav ? "★ Remove from Favorites" : "☆ Add to Favorites"}
                </button>
              </div>

              {ingredients && ingredients.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold mb-1">Ingredients</h2>
                  <ul className="text-sm text-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {ingredients.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{item.ingredient}</span>{" "}
                        <span className="text-slate-300">{item.measure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-semibold">Instructions</h2>
            <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">
              {meal.strInstructions}
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default RecipeDetailPage;
