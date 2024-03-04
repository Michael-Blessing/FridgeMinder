"use client";
import { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import RecipeList from "./RecipeList";
import { Recipe } from "../../types/RecipeType";
import IngredientsOptions from "./IngredientsOptions";
import { IngredientLabelType } from "../../types/IngredientLabelType";
import "./styles/recipe-image-ingredient.css";

const ImageUploader = () => {
  const [file, setFile] = useState<null | File>(null);
  const [base64, setBase64] = useState<any>(null);
  const [ingredients, setIngredients] = useState<IngredientLabelType[]>([]);
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedBase64 = localStorage.getItem("uploadedBase64");
    const storedIngredients = localStorage.getItem("uploadedIngredients");
    const storedRecipesData = localStorage.getItem("uploadedRecipesData");

    if (storedBase64) setBase64(storedBase64);
    if (storedIngredients) setIngredients(JSON.parse(storedIngredients));
    if (storedRecipesData) setRecipesData(JSON.parse(storedRecipesData));
  }, []);

  const onFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const selectedFile: File = await e.target.files[0];
    const base64 = await toBase64(selectedFile);
    setBase64(base64);
    setFile(selectedFile);
    localStorage.setItem("uploadedBase64", base64);
  };

  const fetchLabels = async () => {
    try {
      const responseLabels = await fetch("/api/annotateImage", {
        method: "POST",
        body: JSON.stringify({ base64 }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataLabels = await responseLabels.json();
      const labels = dataLabels.labels;

      if (labels.length === 0) {
        return alert("No ingredients found, please try again.");
      }

      const newIngredients: IngredientLabelType[] = labels.map((label) => ({
        ingredient: label.description,
        checked: true,
      }));

      setIngredients(newIngredients);
      localStorage.setItem(
        "uploadedIngredients",
        JSON.stringify(newIngredients),
      );
    } catch (error) {
      console.error("Error fetching labels:", error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const responseRecipes = await fetch("/api/fetchRecipes", {
        method: "POST",
        body: JSON.stringify({ ingredients }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const recipesData = await responseRecipes.json();
      if (recipesData.length === 0) {
        alert("No recipes found, please try again.");
      }

      setRecipesData(recipesData);
      localStorage.setItem("uploadedRecipesData", JSON.stringify(recipesData));
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onClick = (e) => {
    e.currentTarget.value = "";
  };

  const handleRecipeChanges = (selectedIngredients) => {
    setIngredients(selectedIngredients);
    localStorage.setItem(
      "uploadedIngredients",
      JSON.stringify(selectedIngredients),
    );
  };

  const fetchLabelsAndRecipes = async (e) => {
    e.preventDefault();
    if (!file) return;

    await fetchLabels();
    await fetchRecipes();
  };

  return (
    <div className="upload-container">
      <h1 className="recipe-title">Upload Image</h1>
      <div className="actual-upload-container">
        <form
          className="upload-form"
          method="POST"
          encType="multipart/form-data"
          onSubmit={fetchLabelsAndRecipes}
        >
          <label htmlFor="avatar" className="file-label">
            Choose a file
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={onFileChange}
            onClick={onClick}
            className="file-input"
          />
          <button type="submit" className="upload-button">
            Upload
          </button>
        </form>

        {base64 && (
          <div className="image-container">
            <Image
              src={base64}
              width={300}
              height={200}
              alt="Uploaded Image"
              className="uploaded-image"
            />
          </div>
        )}
      </div>
      <h1 className="recipe-title">Recipes</h1>

      <Suspense fallback={<div>Loading Recipes...</div>}>
        {recipesData && <RecipeList recipesData={recipesData} />}
      </Suspense>

      <IngredientsOptions
        ingredients={ingredients}
        onChange={handleRecipeChanges}
      />
      <button onClick={fetchRecipes} className="fetch-button">
        Fetch with Ingredients
      </button>
    </div>
  );
};

const toBase64 = async (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default ImageUploader;
