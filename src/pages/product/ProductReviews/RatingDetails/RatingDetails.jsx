import RatingSummary from "./RatingSummary/RatingSummary";
import ReviewsHistogram from "./ReviewsHistogram/ReviewsHistogram";

import "./RatingDetails.css";

function RatingDetails({ productData }) {
  return (
    <div className="rating-details">
      <RatingSummary productData={productData} />
      {/* <ReviewsHistogram /> */}
    </div>
  );
}

export default RatingDetails;
