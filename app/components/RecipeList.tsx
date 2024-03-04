import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles/recipe-image-ingredient.css";

const RecipeList = ({ recipesData }) => {
  return (
    <div className="recipes-container">
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

          {/* Insert Absolute fucking Monkey Idea here
            Monkey Idea didn't work, Monkey sad. */}
          <div key={recipe.id} className="recipe-container ">
            <h2 className="">{recipe.title}</h2>
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={400}
              height={300}
              className=""

            />
            <p className="bolded">
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
