import Button from "../../../../components/Button/Button";
import SellerDetails from "../ProductHeader/SellerDetails/SellerDetails";

import "./ProductDescription.css";
import ProductDetails from "./Details/Details";

function ProductDescription({ product, seller }) {
  // const productDetails =

  return (
    <div className="product-description">
      <h2 className="!font-semibold">product name</h2>

      <div className="py-4">
        <span className="block text-xl max-sm:text-lg font-semibold">
          150 AED
        </span>
        <span className="text-[#584F41] font-light text-sm">1 March 2025</span>
      </div>

      <div className="btns">
        <Button type={"main"} text={"Add to bag"} className="btn" />
        <Button type={"second"} text={"make offer"} className="btn" />
      </div>

      <ProductDetails />
    </div>
  );
}

export default ProductDescription;
