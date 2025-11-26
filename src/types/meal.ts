export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strMealThumb: string;
  strInstructions: string;
}

export interface RandomMealResponse {
  meals: Meal[];
}