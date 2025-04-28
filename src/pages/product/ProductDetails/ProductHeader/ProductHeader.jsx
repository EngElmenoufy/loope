import SellerDetails from "./SellerDetails/SellerDetails";
import "./ProductHeader.css";

function ProductHeader() {
  return (
    <div className="product-header">
      <SellerDetails />
      <div className="flex gap-3 items-center">
        <img src="icons/flag.png" alt="report the product" className="icon" />
        <img src="icons/share.png" alt="share the product" className="icon" />
      </div>
    </div>
  );
}

export default ProductHeader;
