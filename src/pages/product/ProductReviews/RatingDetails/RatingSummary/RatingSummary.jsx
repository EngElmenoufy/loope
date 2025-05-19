import { Rating } from "@mui/material";
import "./RatingSummary.css";

function RatingSummary({ productData }) {
  return (
    <div className="flex flex-col items-center w-fit gap-3 mt-5">
      <span className="rating">
        {productData?.averageRate ? productData?.averageRate : 0}
      </span>
      <Rating
        name="rating-summary"
        value={productData?.averageRate ? productData?.averageRate : 0}
        precision={0.5}
        readOnly
      />
      <span>
        {productData?.totalReviews ? productData?.totalReviews : 0} global
        ratings
      </span>
    </div>
  );
}

export default RatingSummary;
