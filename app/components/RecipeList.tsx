import React from "react";
import Image from "next/image";
import Link from "next/link";

const RecipeList = ({ recipesData }) => {
  return (
    <div className="">
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
          <div key={recipe.id} className="">
            <h2 className="">{recipe.title}</h2>
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={400}
              height={300}
              className=""
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
