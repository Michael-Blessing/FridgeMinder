"use client";
import { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import RecipeList from "./RecipeList";
import {Recipe} from "../RecipeType";
//import RecipeOptions from "./IngredientsOptions";

const ImageUploader = () => {
  const [file, setFile] = useState<null|File>(null);
  const [base64, setBase64] = useState<null|string>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipesData, setRecipesData] = useState<null|Recipe[]>(null);

  useEffect(() => {
    const storedBase64 = localStorage.getItem("uploadedBase64");
    if (storedBase64) {
      setBase64(storedBase64);
    }
    const storedIngredients = localStorage.getItem("uploadedIngredients");
    if (storedIngredients) {
      setIngredients(JSON.parse(storedIngredients));
    }
    const storedRecipesData = localStorage.getItem("uploadedRecipesData");
    if (storedRecipesData) {
      setRecipesData(JSON.parse(storedRecipesData));
    }
    
  }, []);





  const onFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const selectedFile:File = e.target.files[0];

    // Convert the file to base64
    const base64: any = await toBase64(selectedFile);


    setFile(selectedFile);
    localStorage.setItem("uploadedBase64", base64);
    setBase64(base64);
  };

  // On click, clear the input value
  const onClick = (e) => {
    e.currentTarget.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    // fetching labels from base64 image
    const responseLabels = await fetch("/api/annotateImage", {
      method: "POST",
      body: JSON.stringify({ base64 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataLabels = await responseLabels.json();
    const labels = dataLabels.labels;
    const ingredients = labels.map((label) => label.description);

    if (ingredients.length === 0) {
      return alert("No ingredients found, please try again.");
    }

    setIngredients(ingredients);
    localStorage.setItem("uploadedIngredients", JSON.stringify(ingredients));
    console.log(ingredients)
    // fetching recipes from labels

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
    // Clear the states after upload
    // setRecipesData(null);
    //setFile(null);
    //setBase64(null);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-70 h-70 px-6 bg-purple-200">
        <h1 className="text-3xl font-bold mb-4">Upload Image</h1>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="mb-8 flex-col"
        >
          <label htmlFor="avatar" className="block text-gray-600">
            Choose a file
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={onFileChange}
            onClick={onClick}
            className="mt-2 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="text-lg font-bold border-2 rounded-lg border-purple-400 hover:bg-gradient-to-r from-purple-800 to-blue-800 hover:text-white hover:border-pink-200 p-1"
          >
            Upload
          </button>
        </form>

        {base64 && (
          <div className="mb-8">
            <Image
              src={base64}
              sizes="100vw"
              width="0"
              height="0"
              alt="Uploaded Image"
              className="rounded-md w-full h-auto"
            />
          </div>
        )}

        <Suspense fallback={<div>Loading Recipes...</div>}>
          {recipesData ? <RecipeList recipesData={recipesData} /> : <></>}
        </Suspense>
      </div>
    </>
  );
};

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default ImageUploader;
