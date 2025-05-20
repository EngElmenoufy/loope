import RatingDetails from "./RatingDetails/RatingDetails";
import Reviews from "./Reviews/Reviews";

import "./ProductReviews.css";

function ProductReviews({ productReviews, productData, onAddReview }) {
  return (
    <section className="rating-reviews-section bg-white rounded-lg">
      <h3>Ratings and Reviews</h3>
      <div className="rating-reviews">
        <RatingDetails productData={productData} />
        <Reviews productReviews={productReviews} onAddReview={onAddReview} />
      </div>
    </section>
  );
}

export default ProductReviews;
