"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [base64, setBase64] = useState(null);

  const onFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
  
    const selectedFile = e.target.files[0];
  
    // Convert the file to base64
    const base64 = await toBase64(selectedFile);
  
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

    // You can upload the base64 to your server here
    await fetch("/api/fetchLabels", {
      method: "POST",
      body: JSON.stringify({ base64 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Clear the states after upload
    setFile(null);
    setBase64(null);
  };

  return (
    <>
      <h1>Upload Image</h1>
      <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={onFileChange}
          onClick={onClick}
        />
        <button type="submit">Upload</button>
      </form>
      {base64 && (
        <Image src={base64} width={750} height={500} alt="Uploaded Image" />
      )}
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
