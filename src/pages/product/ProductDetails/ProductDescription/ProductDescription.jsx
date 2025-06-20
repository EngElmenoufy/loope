import Button from "../../../../components/Button/Button";
import SellerDetails from "../ProductHeader/SellerDetails/SellerDetails";

import "./ProductDescription.css";
import Details from "./Details/Details";
import { useEffect, useState } from "react";

function ProductDescription({
  categories,
  brands,
  productData,
  seller,
  handleAddToCart,
}) {
  const processedColors = productData?.colors
    ? typeof productData.colors[0] === "string"
      ? productData.colors[0].split(",").map((color) => color.trim())
      : Array.isArray(productData.colors)
        ? productData.colors
        : []
    : [];

  const processedSize = productData?.size
    ? typeof productData.size[0] === "string"
      ? productData.size[0].split(",").map((size) => size.trim())
      : Array.isArray(productData.size)
        ? productData.size
        : []
    : [];

  const [selectedColor, setSelectedColor] = useState(processedColors[0]);
  const [selectedSize, setSelectedSize] = useState(processedSize[0]);

  useEffect(() => {
    setSelectedColor(processedColors[0]);
    setSelectedSize(processedSize[0]);
  }, [productData]);

  const [quantity, setQuantity] = useState(1);

  // const quantityOptions = [];

  const quantityOptions = Array.from(
    { length: productData.stock_quantity },
    (_, i) => (i + 1).toString()
  );

  const handleChangeQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);
  };

  // console.log(productData.isNegotiable);

  return (
    <div className="product-description">
      <p className="text-xl !font-semibold pb-4">{productData.name}</p>
      {/* <div className="py-4">
        <span className="block text-xl max-sm:text-lg font-semibold">
          {productData.price} EGP
        </span>
      </div> */}
      <div className="flex flex-col border-t border-gray-200 py-4">
        {productData.discount ? (
          <>
            <span className="text-2xl text-[#18403C] font-medium">
              {(productData.price * (1 - productData.discount / 100)).toFixed(
                2
              )}{" "}
              EGP
            </span>
            <div className="flex gap-[2px] items-center">
              <span className="text-gray-500 line-through text-sm">
                {productData.price} EGP
              </span>
              <span className="text-gray-700 ml-4 rounded-lg text-xs bg-green-400 px-1">
                {productData.discount}% off
              </span>
              {productData.isNegotiable ? (
                <span className="text-[#004D40] ml-4 rounded-lg text-xs bg-[#ffc020] px-1">
                  Negotiable
                </span>
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex gap-[2px] items-center">
            <span className="text-2xl text-[#18403C] font-medium">
              {productData.price} EGP
            </span>
            {productData.isNegotiable ? (
              <span className="text-[#004D40] ml-4 rounded-lg text-xs bg-[#ffc020] px-1">
                Negotiable
              </span>
            ) : null}
          </div>
        )}
      </div>

      {/* {processedColors.length > 0 ||
        (processedSize.length > 0 && ( */}
      <div className="border-y mb-4 py-4 border-gray-200">
        {processedColors.length > 0 && (
          <div className={` ${productData.colors.length === 0 ? "pb-7" : ""}`}>
            <label className="block text-lg font-semibold text-[#0e150e]">
              Colors
            </label>

            <div className="color-options mt-2 flex flex-wrap gap-2">
              {processedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === selectedColor
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        )}

        {processedSize.length > 0 && (
          <div
            className={` ${productData?.size && productData?.size.length === 0 ? "pb-7" : ""}`}
          >
            <label className="block text-lg font-semibold text-[#0e150e]">
              Sizes
            </label>

            <div className="size-options mt-2 flex flex-wrap gap-2">
              {processedSize.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`px-3 py-1 border rounded-md transition-colors ${
                    size === selectedSize
                      ? "bg-black text-white border-black"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-lg font-semibold text-[#0e150e]">
            Quantity
          </label>
          <select
            name="quantity"
            className="mt-2 cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            value={quantity}
            onChange={handleChangeQuantity}
          >
            {quantityOptions.map((quan) => (
              <option key={quan} value={quan}>
                {quan}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* // ))} */}

      <div className="btns">
        <Button
          type={"main"}
          text={"Add to cart"}
          className="btn"
          onClick={() => handleAddToCart(quantity)}
        />
        {/* {productData.isNegotiable ? (
          <Button type={"second"} text={"make offer"} className="btn" />
        ) : null} */}
      </div>
      <Details
        productData={productData}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}

export default ProductDescription;
