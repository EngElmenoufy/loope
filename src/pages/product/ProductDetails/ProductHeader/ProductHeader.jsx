import SellerDetails from "./SellerDetails/SellerDetails";
import "./ProductHeader.css";

function ProductHeader({ sellerData }) {
  // console.log(sellerData);

  return (
    <div className="product-header">
      {/* <SellerDetails sellerData={sellerData} /> */}
      <div role="link" className="flex items-center gap-4 w-fit">
        <img
          src="man.jpg"
          alt="seller image"
          className="rounded-full w-10 h-10"
        />
        <div>
          <span className="block text-lg font-semibold">
            {sellerData?.firstName} {sellerData?.lastName}
          </span>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <img src="icons/flag.png" alt="report the product" className="icon" />
        <img src="icons/share.png" alt="share the product" className="icon" />
      </div>
    </div>
  );
}

export default ProductHeader;
