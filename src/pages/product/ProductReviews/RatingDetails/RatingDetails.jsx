import RatingSummary from "./RatingSummary/RatingSummary";
import ReviewsHistogram from "./ReviewsHistogram/ReviewsHistogram";

import "./RatingDetails.css";

function RatingDetails() {
  return (
    <div className="rating-details">
      <RatingSummary />
      <ReviewsHistogram />
    </div>
  );
}

export default RatingDetails;
