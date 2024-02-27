// IngredientsOptions.tsx
import React, { useState, useEffect } from "react";
import { IngredientLabelType } from "../../types/IngredientLabelType";

interface IngredientsOptionsProps {
  ingredients: IngredientLabelType[];
  onChange: (selectedIngredients: IngredientLabelType[]) => void;
}

const IngredientsOptions: React.FC<IngredientsOptionsProps> = ({
  ingredients,
  onChange,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientLabelType[]
  >([]);

  useEffect(() => {
    // Initially select all ingredients without triggering the onChange
    setSelectedIngredients(ingredients);
  }, [ingredients]);

  const handleCheckboxChange = (ingredient: IngredientLabelType) => {
    const updatedIngredients = selectedIngredients.map((selectedIngredient) => {
      if (selectedIngredient.ingredient === ingredient.ingredient) {
        return { ...selectedIngredient, checked: !selectedIngredient.checked };
      }
      return selectedIngredient;
    });

    setSelectedIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  return (
    <div>
      <h2>Ingredient Options</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={ingredient.checked}
              onChange={() => handleCheckboxChange(ingredient)}
            />{" "}
            {ingredient.ingredient}
          </label>
        </div>
      ))}
    </div>
  );
};

export default IngredientsOptions;
