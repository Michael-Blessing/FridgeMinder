export interface Recipe {
    id: number;
    title: string;
    image: string;
    missedIngredients: string[];
    usedIngredients: string[];
  }

export type {Recipe as RecipeType}
