import { FormEvent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { favoriteIds } = useFavorites();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = term.trim();
    if (!query) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1 rounded-md text-sm font-medium ${
      isActive ? "bg-slate-700 text-emerald-300" : "text-slate-200 hover:bg-slate-800"
    }`;

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3 justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold text-emerald-400">Meal Explorer</span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/favorites" className={linkClasses}>
            Favorites ({favoriteIds.length})
          </NavLink>
          <NavLink to="/random" className={linkClasses}>
            Random
          </NavLink>
        </nav>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search recipes..."
            className="w-full sm:w-56 rounded-md bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Navbar;