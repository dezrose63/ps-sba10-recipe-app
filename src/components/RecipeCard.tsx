import React from "react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  name: string;
  image: string;
  subtitle?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  name,
  image,
  subtitle,
}) => {
  return (
    <Link
      to={`/recipe/${id}`}
      className="rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-400 hover:bg-slate-800/80 transition p-3 flex flex-col gap-2"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-28 object-cover rounded-lg"
      />
      <h2 className="text-sm font-semibold">{name}</h2>
      {subtitle && <p className="text-xs text-slate-300">{subtitle}</p>}
    </Link>
  );
};

export default RecipeCard;
