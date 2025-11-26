import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

interface CategoriesResponse {
  categories: Category[];
}

const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

const HomePage = () => {
  const { data, loading, error } = useFetch<CategoriesResponse>(CATEGORIES_URL);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Browse Categories</h1>

      {loading && <Spinner label="Loading categories…" />}

      {error && (
        <ErrorMessage title="Failed to load categories" message={error} />
      )}

      {!loading && !error && data && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data.categories.map((cat) => (
            <Link
              key={cat.idCategory}
              to={`/category/${encodeURIComponent(cat.strCategory)}`}
              className="rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-400 hover:bg-slate-800/80 transition p-3 flex flex-col gap-2"
            >
              <img
                src={cat.strCategoryThumb}
                alt={cat.strCategory}
                className="w-full h-28 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-sm font-semibold">{cat.strCategory}</h2>
                <p className="text-xs text-slate-300 line-clamp-3">
                  {cat.strCategoryDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
