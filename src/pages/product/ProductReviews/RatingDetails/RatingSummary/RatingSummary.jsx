import { Rating } from "@mui/material";
import "./RatingSummary.css";

function RatingSummary() {
  return (
    <div className="flex flex-col items-center w-fit gap-3 mt-5">
      <span className="rating">4.5</span>
      <Rating name="rating-summary" value={4.5} precision={0.5} readOnly />
      <span>210 global ratings</span>
    </div>
  );
}

export default RatingSummary;
