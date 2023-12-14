import React from "react";
import Image from "next/image";
import Link from "next/link";

const RecipeList = ({ recipesData }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {recipesData.map((recipe) => (
        <Link
          key={recipe.id}
          href={{
            pathname: `/detailRecipe/${recipe.id}`,
            query: {
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
              missedIngredients: JSON.stringify(recipe.missedIngredients),
              usedIngredients: JSON.stringify(recipe.usedIngredients),
            },
          }}
        >
          <div key={recipe.id} className="mb-8 p-4 border rounded-md">
            <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={400}
              height={300}
              className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <p>
              Used Ingredients: {recipe.usedIngredientCount}, Missed
              Ingredients: {recipe.missedIngredientCount}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;
