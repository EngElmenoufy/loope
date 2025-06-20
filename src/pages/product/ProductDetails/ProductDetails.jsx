import ProductDescription from "./ProductDescription/ProductDescription";
import ProductPictures from "./ProductPictures/ProductPictures";

import "./ProductDetails.css";
import ProductHeader from "./ProductHeader/ProductHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductDetails({ categories, brands, data, sellerData, addToCart }) {
  const handleAddToCart = (quan) => {
    const prodata = {
      productId: data._id,
      sellerId: sellerData._id,
      quantity: quan,
    };

    addToCart(prodata);
  };

  return (
    <section className="product-details">
      {/* <ProductHeader sellerData={sellerData} /> */}
      <div className="product-header">
        {/* <SellerDetails sellerData={sellerData} /> */}

        <Link
          to={`/profile/${sellerData._id}`}
          className="flex items-center gap-4 w-fit cursor-pointer"
        >
          <img
            src={
              sellerData.avatar ===
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPwA="
                ? "../../../../public/profile.jpg"
                : sellerData.avatar
            }
            alt="image"
            className="rounded-full w-10 h-10"
          />
          <div>
            <span className="block text-lg font-semibold">
              {sellerData?.firstName} {sellerData?.lastName}
            </span>
          </div>
        </Link>

        {/* <div className="flex gap-3 items-center">
          <img src="icons/flag.png" alt="report the product" className="icon" />
          <img src="icons/share.png" alt="share the product" className="icon" />
        </div> */}
      </div>
      <ProductPictures productData={data} />
      <ProductDescription
        categories={categories}
        brands={brands}
        handleAddToCart={handleAddToCart}
        productData={data}
      />
    </section>
  );
}

export default ProductDetails;
