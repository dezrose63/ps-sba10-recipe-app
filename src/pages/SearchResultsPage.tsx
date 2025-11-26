import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Meal } from "./RandomMeal";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

interface SearchResponse {
  meals: Meal[] | null;
}

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const trimmed = query.trim();

  const url = trimmed
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        trimmed
      )}`
    : "";

  const { data, loading, error } = useFetch<SearchResponse>(url);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Search results{" "}
        {trimmed && (
          <span className="text-base font-normal text-slate-300">
            for “{trimmed}”
          </span>
        )}
      </h1>

      {!trimmed && (
        <p className="text-sm text-slate-300">
          Enter a recipe name in the search bar above to get started.
        </p>
      )}

      {trimmed && loading && (
  <Spinner label="Searching recipes…" />
)}

{trimmed && error && (
  <ErrorMessage title="Search failed" message={error} />
)}

{trimmed && !loading && !error && data && data.meals && (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    {data.meals.map((meal) => (
      <RecipeCard
        key={meal.idMeal}
        id={meal.idMeal}
        name={meal.strMeal}
        image={meal.strMealThumb}
        subtitle={`${meal.strCategory} • ${meal.strArea}`}
      />
    ))}
  </div>
)}
      {trimmed && !loading && !error && data && data.meals === null && (
        <p className="text-sm text-slate-300">
          No recipes found for “{trimmed}”.
        </p>
      )}
    </div>
  );
};

export default SearchResultsPage;