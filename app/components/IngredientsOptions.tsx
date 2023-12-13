import React, { useState } from "react";

const IngredientsOptions = ({ ingredients, selectedIngredients, onSelect }) => {
  return (
    <div>
      <h2>Select Ingredients:</h2>
      {ingredients.map((ingredient) => (
        <label key={ingredient}>
          <input
            type="checkbox"
            value={ingredient}
            checked={selectedIngredients.includes(ingredient)}
            onChange={() => onSelect(ingredient)}
          />
          {ingredient}
        </label>
      ))}
    </div>
  );
};

export default IngredientsOptions;
