"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import RecipeList from "./RecipeList";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(null);
  const [recipesData, setRecipesData] = useState(null);

  const onFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const selectedFile = e.target.files[0];

    // Convert the file to base64
    const base64: any = await toBase64(selectedFile);

    setFile(selectedFile);
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
    const responseLabels = await fetch("/api/annonateImage", {
      method: "POST",
      body: JSON.stringify({ base64 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataLabels = await responseLabels.json();
    const labels = dataLabels.labels
    const ingredients = labels.map((label) => label.description)
    console.log(ingredients);

    // fetching recipes from labels

    const responseRecipes = await fetch("/api/fetchRecipes", {
      method: "POST",
      body: JSON.stringify({ ingredients }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const recipesData = await responseRecipes.json();
    setRecipesData(recipesData)


    // Clear the states after upload
    // setRecipesData(null);
    //setFile(null);
    //setBase64(null);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-70 h-70 px-6">
        <h1 className="text-2xl font-bold mb-4">Upload Image</h1>
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
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
        
        {base64 && (
          <div className="mb-8">
            <Image
              src={base64}
              width={750}
              height={500}
              alt="Uploaded Image"
              className="rounded-md"
            />
          </div>
        )}

        {recipesData && <RecipeList recipesData={recipesData} />}
      </div>
    </>
  );
};

const toBase64 = (file) => {
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
