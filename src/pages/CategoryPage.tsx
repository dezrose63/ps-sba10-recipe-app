import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

interface CategoryMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface CategoryMealsResponse {
  meals: CategoryMeal[] | null;
}

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
    categoryName ?? ""
  )}`;

  const { data, loading, error } = useFetch<CategoryMealsResponse>(url);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Category: <span className="text-emerald-300">{categoryName}</span>
      </h1>

      {loading && <Spinner label="Loading recipes…" />}

      {error && <ErrorMessage title="Failed to load recipes" message={error} />}

      {!loading && !error && data && data.meals && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              image={meal.strMealThumb}
            />
          ))}
        </div>
      )}

      {!loading && !error && (!data || !data.meals) && (
        <p className="text-sm text-slate-300">
          No recipes found for this category.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
