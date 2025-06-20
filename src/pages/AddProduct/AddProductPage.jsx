import React, { useEffect, useRef, useState } from "react";
// import AddedProductDetails from "./AddedProductDetails/AddedProductDetails";
// import AddedProductMoreDetails from "./AddedProductMoreDetails/AddedProductMoreDetails";
// import AddFiles from "./AddFiles/AddFiles";

import ButtonWithLoading from "../../components/ButtonWithLoading/ButtonWithLoading";

import "./AddProductPage.css";
import { Alert } from "@mui/material";

export default function AddProductPage({ categories, brands, onAdd, user }) {
  // Default color and size options
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");

  const defaultColors = [
    { id: 1, name: "Red", hex: "#ff0000" },
    { id: 2, name: "Green", hex: "#00ff00" },
    { id: 3, name: "Blue", hex: "#0000ff" },
    { id: 4, name: "Black", hex: "#000000" },
    { id: 5, name: "White", hex: "#ffffff" },
    { id: 6, name: "Yellow", hex: "#ffff00" },
    { id: 7, name: "Purple", hex: "#800080" },
    { id: 8, name: "Pink", hex: "#ffc0cb" },
    { id: 9, name: "Orange", hex: "#ffa500" },
    { id: 10, name: "Gray", hex: "#808080" },
  ];

  const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // console.log(user._id);
  const [productData, setProductData] = useState({
    img: [],
    name: "",
    price: "",
    condition: "new",
    stock_quantity: "",
    description: "",
    isNegotiable: false,
    category: "",
    sellerId: user._id,
    Brand: "",
    colors: [], // Initialize with first color
    size: [], // Initialize with 'M'
  });

  const [errorData, setErrorData] = useState({
    name: "",
    price: "",
    stock_quantity: "",
    description: "",
    category: "",
    isNegotiable: "",
    Brand: "",
  });

  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 6) {
      setUploadError("You can only upload up to 6 images");
      return;
    }

    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.split("/")[0],
    }));

    setFiles([...files, ...newFiles]);
    setProductData((prev) => ({
      ...prev,
      img: [...prev.img, ...selectedFiles], // Store the actual File objects
    }));
    setUploadError("");
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview); // Clean up memory
    newFiles.splice(index, 1);

    const newImgFiles = [...productData.img];
    newImgFiles.splice(index, 1);

    setFiles(newFiles);
    setProductData((prev) => ({
      ...prev,
      img: newImgFiles,
    }));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (name === "category") {
      // Find the selected category and get its ID
      const selectedCategory = categories.find((cat) => cat.name === value);
      newValue = selectedCategory ? selectedCategory : "";
    } else if (name === "Brand") {
      const selectedBrand = brands.find((bra) => bra.name === value);
      newValue = selectedBrand ? selectedBrand : "";
    } else {
      newValue = type === "checkbox" ? checked : value;
    }

    setProductData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (errorData[name]) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setProductData((prev) => {
      const colorExists = prev.colors.some((c) => c.id === color.id);
      const newColors = colorExists
        ? prev.colors.filter((c) => c.id !== color.id)
        : [...prev.colors, color];

      return { ...prev, colors: newColors };
    });
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setProductData((prev) => {
      const sizeExists = prev.size.includes(size);
      const newSizes = sizeExists
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size];

      return { ...prev, size: newSizes };
    });
  };

  // Add custom color
  const handleAddCustomColor = () => {
    if (productData.customColor) {
      const newColor = {
        id: Date.now(),
        name: `Custom (${productData.customColor})`,
        hex: productData.customColor,
      };
      setProductData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
        customColor: "",
      }));
      setShowCustomColorPicker(false);
    }
  };

  // Field validation
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return !value.trim() ? "Please enter the product name" : "";
      case "price":
        if (!value.trim()) return "Please enter the price";
        if (isNaN(value) || parseFloat(value) <= 0)
          return "Please enter a valid price";
        return "";
      case "stock_quantity":
        if (!value.trim()) return "Please enter stock quantity";
        if (!Number.isInteger(Number(value)) || Number(value) < 0)
          return "Please enter a valid quantity";
        return "";
      case "description":
        return !value.trim() ? "Please enter the description" : "";
      case "category":
        return typeof value === "string" && !value.trim()
          ? "Please select a category"
          : "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrorData((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(productData).forEach((key) => {
      if (key in errorData) {
        // Only validate fields that have error states
        newErrors[key] = validateField(key, productData[key]);
      }
    });

    setErrorData(newErrors);

    // Check if any errors exist
    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) return;

    // Submit logic here
    onAdd(productData);
    // console.log("Form submitted:", productData);
  };

  // Calculate earnings (10% fee)
  const yourEarnings = productData.price
    ? (parseFloat(productData.price) * 0.9).toFixed(2)
    : "";

  return (
    <main className="min-h-screen p-4 mx-auto max-w-[700px]">
      <h2 className="mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        {/* <AddFiles
          files={uploadedFiles}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
        /> */}

        <div className={`mb-1 ${!uploadError ? "pb-5" : ""}`}>
          <p className="block text-base font-semibold text-gray-800">
            Upload up to 6 pictures of the product
          </p>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />

          {files.length === 0 ? (
            <div
              className="bg-white mt-1 rounded-lg border border-gray-200 p-6 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="bg-gray-100 rounded-lg p-4 mb-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Upload pictures of the product
              </p>
            </div>
          ) : (
            <div>
              <div className="grid mt-1 grid-cols-3 gap-2 mb-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative bg-gray-100 rounded-lg aspect-square shadow-md"
                  >
                    <img
                      src={file.preview}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#191919"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>
                ))}
                {files.length < 6 && (
                  <div
                    className="flex items-center justify-center bg-white rounded-lg aspect-square cursor-pointer shadow-md"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="30px"
                        viewBox="0 -960 960 960"
                        width="30px"
                        fill="#191919"
                      >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 text-center">
            {files.length}/6 files uploaded
          </p>
          {(uploadError || errorData.img) && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM6.5999 3.00002C6.5999 2.77901 6.42091 2.60002 6.1999 2.60002C5.97889 2.60002 5.7999 2.77901 5.7999 3.00002V6.00002C5.7999 6.22103 5.97889 6.40002 6.1999 6.40002C6.42091 6.40002 6.5999 6.22103 6.5999 6.00002V3.00002ZM6.1999 8.40002C6.64173 8.40002 6.9999 8.04185 6.9999 7.60002C6.9999 7.15819 6.64173 6.80002 6.1999 6.80002C5.75807 6.80002 5.3999 7.15819 5.3999 7.60002C5.3999 8.04185 5.75807 8.40002 6.1999 8.40002Z"
                  fill="#E14627"
                />
              </svg>
              {uploadError || errorData.img}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.name ? "pb-5" : ""}`}>
          <label
            htmlFor="productName"
            className="block text-base font-semibold text-gray-800"
          >
            Product Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="productName"
            value={productData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errorData.name ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter the product name"
          />
          {errorData.name && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.name}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.price ? "pb-5" : ""}`}>
          <label
            htmlFor="price"
            className="block text-base font-semibold text-gray-800"
          >
            List Price <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={productData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errorData.price ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter the product's price"
          />
          {errorData.price && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.price}
            </p>
          )}
        </div>

        <div className={`mb-1 pb-5`}>
          <label
            htmlFor="yourEarnings"
            className="block text-base font-semibold text-gray-800"
          >
            Your Earnings
          </label>
          <input
            type="text"
            name="yourEarnings"
            id="yourEarnings"
            value={yourEarnings}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Your Earnings"
            disabled
          />
        </div>

        <div className={`mb-1 ${!errorData.stock_quantity ? "pb-5" : ""}`}>
          <label
            htmlFor="stock"
            className="block text-base font-semibold text-gray-800"
          >
            Stock Quantity <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="stock_quantity"
            id="stock"
            value={productData.stock_quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errorData.stock_quantity ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter the stock quantity"
          />
          {errorData.stock_quantity && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.stock_quantity}
            </p>
          )}
        </div>

        <div className="mb-1 pb-5">
          <label
            htmlFor="condition"
            className="block text-base font-semibold text-gray-800"
          >
            Condition <span className="text-red-600">*</span>
          </label>
          <select
            id="condition"
            name="condition"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={productData.condition}
            onChange={handleChange}
          >
            <option value="new">new</option>
            <option value="used">used</option>
          </select>
        </div>

        <div
          className={`flex flex-col justify-center mb-1 ${!errorData.isNegotiable ? "pb-5" : ""}`}
        >
          <div>
            <input
              name="isNegotiable"
              id="isNegotiable"
              type="checkbox"
              checked={productData.isNegotiable}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="isNegotiable" className="cursor-pointer">
              Is price negotiable?
            </label>
          </div>
          {errorData.isNegotiable && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM6.5999 3.00002C6.5999 2.77901 6.42091 2.60002 6.1999 2.60002C5.97889 2.60002 5.7999 2.77901 5.7999 3.00002V6.00002C5.7999 6.22103 5.97889 6.40002 6.1999 6.40002C6.42091 6.40002 6.5999 6.22103 6.5999 6.00002V3.00002ZM6.1999 8.40002C6.64173 8.40002 6.9999 8.04185 6.9999 7.60002C6.9999 7.15819 6.64173 6.80002 6.1999 6.80002C5.75807 6.80002 5.3999 7.15819 5.3999 7.60002C5.3999 8.04185 5.75807 8.40002 6.1999 8.40002Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.isNegotiable}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.description ? "pb-5" : ""}`}>
          <label
            htmlFor="desc"
            className="block text-base font-semibold text-gray-800"
          >
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            name="description"
            id="desc"
            value={productData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 resize-none ${errorData.description ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter the description of your product"
            rows="3"
          />
          {errorData.description && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.description}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.category ? "pb-5" : ""}`}>
          <label
            htmlFor="category"
            className="block text-base font-semibold text-gray-800"
          >
            Category <span className="text-red-600">*</span>
          </label>
          <select
            id="category"
            name="category"
            className={`mt-1 ${errorData.category ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            value={productData.category.name}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled selected>
              select category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errorData.category && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.category}
            </p>
          )}
        </div>

        <div className={`mb-1 ${!errorData.Brand ? "pb-5" : ""}`}>
          <label
            htmlFor="brand"
            className="block text-base font-semibold text-gray-800"
          >
            Brand <span className="text-red-600">*</span>
          </label>
          <select
            id="brand"
            name="Brand"
            className={`mt-1 ${errorData.Brand ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            value={productData.Brand.name}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="" disabled selected>
              select brand
            </option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
          {errorData.Brand && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.Brand}
            </p>
          )}
        </div>

        {/* <div className={`mb-1 ${!errorData.Brand ? "pb-5" : ""}`}>
          <label
            htmlFor="brand"
            className="block text-base font-semibold text-gray-800"
          >
            Brand <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="Brand"
            id="brand"
            value={productData.Brand}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`mt-1 ${errorData.Brand ? "text-[#E14627]" : ""} block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
            placeholder="Enter the stock quantity"
          />
          {errorData.Brand && (
            <p className="text-sm text-[#E14627] h-[20px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="inline-block mr-2"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.9999 11.6C7.48511 11.6 8.9095 11.01 9.9597 9.95982C11.0099 8.90962 11.5999 7.48524 11.5999 6.00002C11.5999 4.51481 11.0099 3.09043 9.9597 2.04023C8.9095 0.990023 7.48511 0.400024 5.9999 0.400024C4.51469 0.400024 3.09031 0.990023 2.0401 2.04023C0.989901 3.09043 0.399902 4.51481 0.399902 6.00002C0.399902 7.48524 0.989901 8.90962 2.0401 9.95982C3.09031 11.01 4.51469 11.6 5.9999 11.6ZM8.5948 5.09492C8.72231 4.9629 8.79287 4.78608 8.79127 4.60254C8.78968 4.41901 8.71606 4.24344 8.58628 4.11365C8.45649 3.98387 8.28092 3.91025 8.09738 3.90865C7.91385 3.90706 7.73702 3.97761 7.605 4.10512L5.2999 6.41022L4.3948 5.50512C4.26278 5.37761 4.08596 5.30706 3.90242 5.30865C3.71888 5.31025 3.54331 5.38387 3.41353 5.51365C3.28374 5.64344 3.21013 5.81901 3.20853 6.00254C3.20694 6.18608 3.27749 6.3629 3.405 6.49492L4.805 7.89492C4.93627 8.02615 5.11429 8.09987 5.2999 8.09987C5.48552 8.09987 5.66353 8.02615 5.7948 7.89492L8.5948 5.09492Z"
                  fill="#E14627"
                />
              </svg>
              {errorData.Brand}
            </p>
          )}
        </div> */}

        {/* Color Selection */}
        <div
          className={`mb-1 ${productData.colors.length === 0 ? "pb-7" : ""}`}
        >
          <label className="block text-base font-semibold text-gray-800">
            Colors
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({productData.colors.length} selected)
            </span>
          </label>

          <div className="color-options mt-2 flex flex-wrap gap-2">
            {defaultColors.map((color) => (
              <button
                key={color.id}
                type="button"
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  productData.colors.some((c) => c.id === color.id)
                    ? "border-black scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorSelect(color)}
                title={color.name}
                aria-label={color.name}
              />
            ))}

            <button
              type="button"
              className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500"
              onClick={() => setShowCustomColorPicker(!showCustomColorPicker)}
              title="Add custom color"
            >
              +
            </button>
          </div>

          {showCustomColorPicker && (
            <div className="custom-color-picker mt-3 flex items-center gap-2">
              <input
                type="color"
                value={productData.customColor}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    customColor: e.target.value,
                  }))
                }
                className="h-10 w-10 cursor-pointer"
              />
              <input
                type="text"
                value={productData.customColor}
                onChange={(e) =>
                  setProductData((prev) => ({
                    ...prev,
                    customColor: e.target.value,
                  }))
                }
                placeholder="#FFFFFF"
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                type="button"
                onClick={handleAddCustomColor}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Add
              </button>
            </div>
          )}

          <div className="selected-colors mt-2 flex flex-wrap gap-2">
            {productData.colors.map((color) => (
              <div
                key={color.id}
                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </div>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className={`mb-1 ${productData.size.length === 0 ? "pb-7" : ""}`}>
          <label className="block text-base font-semibold text-gray-800">
            Sizes
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({productData.size.length} selected)
            </span>
          </label>

          <div className="size-options mt-2 flex flex-wrap gap-2">
            {defaultSizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`px-3 py-1 border rounded-md transition-colors ${
                  productData.size.includes(size)
                    ? "bg-black text-white border-black"
                    : "bg-white border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="selected-sizes mt-2 flex flex-wrap gap-2">
            {productData.size.map((size) => (
              <div
                key={size}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm"
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-8 mb-4">
          <button
            type="submit"
            className="w-full bg-[#18403C] text-white py-3 rounded-full font-medium"
          >
            SUBMIT
          </button>
        </div> */}

        <ButtonWithLoading buttonName="Add Product" otherClass="w-full" />
      </form>
    </main>
  );
}
