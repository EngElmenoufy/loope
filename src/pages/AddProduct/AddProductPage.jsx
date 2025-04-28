import React, { useState } from "react";
import AddedProductDetails from "./AddedProductDetails/AddedProductDetails";
import AddedProductMoreDetails from "./AddedProductMoreDetails/AddedProductMoreDetails";
import AddFiles from "./AddFiles/AddFiles";

import "./AddProductPage.css";

export default function AddProductPage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [productName, setProductName] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCagegory] = useState("");
  const [brand, setBrand] = useState("");
  // const [packageSize, setPackageSize] = useState("");

  const yourEarnings = listPrice ? (listPrice * 0.9).toFixed(2) : ""; // Assuming 20% fee

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      uploadedFiles,
      productName,
      listPrice,
      stockQuantity,
      isNegotiable,
      description,
      category,
      brand,
    });
    // Here you would typically send the form data to your backend
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // const files = e.target.files[0];

    if (uploadedFiles.length + files.length > 6) {
      alert("You can only upload up to 6 images");
      return;
    }

    const newUploadedFiles = files.map((file) => ({
      file,
      type: file.type.split("/")[0],
      preview: URL.createObjectURL(file),
    }));

    console.log(newUploadedFiles);

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
  };

  const removeImage = (indexToRemove) => {
    console.log(indexToRemove);
    setUploadedFiles(
      uploadedFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <main className="min-h-screen p-4 mx-auto max-w-[700px]">
      <h2 className="mb-4">Post Your Listing</h2>

      <form onSubmit={handleSubmit}>
        <AddFiles
          files={uploadedFiles}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
        />

        <AddedProductDetails
          productName={productName}
          setProductName={setProductName}
          listPrice={listPrice}
          setListPrice={setListPrice}
          stockQuantity={stockQuantity}
          setStockQuantity={setStockQuantity}
          yourEarnings={yourEarnings}
          isNegotiable={isNegotiable}
          setIsNegotiable={setIsNegotiable}
        />

        <AddedProductMoreDetails
          description={description}
          setDescription={setDescription}
          category={category}
          setCagegory={setCagegory}
          brand={brand}
          setBrand={setBrand}
        />

        <div className="mt-8 mb-4">
          <button
            type="submit"
            className="w-full bg-[#18403C] text-white py-3 rounded-full font-medium"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </main>
  );
}
