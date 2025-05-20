import React from "react";
import "./Details.css";

// const productData = [
//   {
//     name: "Brand",
//     Description: "Other",
//   },
//   {
//     name: "Condition",
//     Description: "New",
//   },
//   {
//     name: "Color",
//     Description: "White",
//   },
//   {
//     name: "Size",
//     Description: "M",
//   },
//   {
//     name: "Description",
//     Description: "Stylish and durable leather bag for laptops.",
//   },
// ];

export default function Details({ categories, brands, productData }) {
  const productCategory = categories.find(
    (category) => category._id === productData.category
  );

  const productBrand = brands.find((brand) => brand._id === productData.Brand);

  // Safely process colors
  // const getProcessedColors = () => {
  //   if (!productData?.colors) return []; // Return empty array if colors is undefined

  //   // If colors is already an array, return it directly
  //   if (Array.isArray(productData.colors)) return productData.colors;

  //   // If colors is a string, try to parse it
  //   if (typeof productData.colors === "string") {
  //     try {
  //       // Remove brackets and quotes, then split
  //       const cleaned = productData.colors.replace(/[\[\]'" ]/g, "");
  //       return cleaned.split(",").map((color) => color.trim());
  //     } catch (e) {
  //       console.error("Error processing colors:", e);
  //       return [];
  //     }
  //   }

  //   return []; // Fallback for any other case
  // };

  return (
    <div className="product-specs">
      <span className="spec-head">Description</span>
      <span className="spec-value">{productData.description}</span>

      {productCategory && (
        <>
          <span className="spec-head">Category</span>
          <span className="spec-value">{productCategory.name}</span>
        </>
      )}

      {productBrand && (
        <>
          <span className="spec-head">Brand</span>
          <span className="spec-value">{productBrand.name}</span>
        </>
      )}

      <span className="spec-head">Condition</span>
      <span className="spec-value">{productData.condition}</span>

      <span className="spec-head">Stock quantity</span>
      <span className="spec-value">{productData.stock_quantity}</span>
    </div>
  );
}
