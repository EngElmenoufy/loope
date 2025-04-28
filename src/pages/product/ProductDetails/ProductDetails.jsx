import ProductDescription from "./ProductDescription/ProductDescription";
import ProductPictures from "./ProductPictures/ProductPictures";

import "./ProductDetails.css";
import ProductHeader from "./ProductHeader/ProductHeader";

function ProductDetails() {
  return (
    <section className="product-details">
      <ProductHeader />
      <ProductPictures />
      <ProductDescription />
    </section>
  );
}

export default ProductDetails;
