import React from "react";
import Image from "next/image";

const RecipeList = ({ recipesData }) => {
  return (
    <div className="flex flex-wrap justify-around">
      {recipesData.map((recipe) => (
        <div key={recipe.id} className="mb-8 p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={250}
            height={250}
            className="w-full h-40 object-cover mb-2 rounded-md"
          />
          <p>
            Used Ingredients: {recipe.usedIngredientCount}, Missed Ingredients:{" "}
            {recipe.missedIngredientCount}
          </p>
          {/* Additional details about the recipe can be displayed here */}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
