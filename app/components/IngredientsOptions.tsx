// IngredientsOptions.tsx
import React, { useState, useEffect } from "react";
import { IngredientLabelType } from "../../types/IngredientLabelType";
import { faX, faFileLines, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/recipe-image-ingredient.css";

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

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setSelectedIngredients(ingredients);
  }, [ingredients]);

  const handleCheckboxChange = (ingredient: IngredientLabelType) => {
    const updatedIngredients = selectedIngredients.map((selectedIngredient) => {
      if (selectedIngredient.ingredient === ingredient.ingredient) {
        return {
          ...selectedIngredient,
          checked: !selectedIngredient.checked,
        };
      }
      return selectedIngredient;
    });

    setSelectedIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleRemoveButtonClick = (ingredient: IngredientLabelType) => {
    const updatedIngredients = selectedIngredients.filter(
      (selectedIngredient) =>
        selectedIngredient.ingredient !== ingredient.ingredient,
    );

    setSelectedIngredients(updatedIngredients);
    onChange(updatedIngredients);
  };

  const handleAddButtonClick = () => {
    if (searchTerm.trim() === "") return;

    const newIngredient: IngredientLabelType = {
      ingredient: searchTerm.trim(),
      checked: true, // You can set a default value for checked
    };

    // Check for duplicates
    if (
      !selectedIngredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase ===
          newIngredient.ingredient.toLowerCase,
      )
    ) {
      const updatedIngredients = [...selectedIngredients, newIngredient];

      setSelectedIngredients(updatedIngredients);
      onChange(updatedIngredients);
    }

    setSearchTerm("");
  };

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="ing-container">
      <h1 className="recipe-little">Ingredient Options</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Search or add new ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="upload-button" onClick={handleAddButtonClick}>
        Add
      </button>
      <div className="flexxing-wrap">
        {filteredIngredients.map((ingredient, index) => (
          <div key={index} className="individual">
            <label className="individual-label">
              <input
                className="checkbox"
                type="checkbox"
                checked={ingredient.checked}
                onChange={() => handleCheckboxChange(ingredient)}
              />{" "}
              {ingredient.ingredient}
            </label>
            <button
              className="deling-button"
              onClick={() => handleRemoveButtonClick(ingredient)}
            >
              <FontAwesomeIcon icon={faX} size="1x" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsOptions;
