import RatingDetails from "./RatingDetails/RatingDetails";
import Reviews from "./Reviews/Reviews";

import "./ProductReviews.css";

function ProductReviews() {
  return (
    <section className="rating-reviews-section bg-white rounded-lg">
      <h3>Ratings and Reviews</h3>
      <div className="rating-reviews">
        <RatingDetails />
        <Reviews />
      </div>
    </section>
  );
}

export default ProductReviews;
