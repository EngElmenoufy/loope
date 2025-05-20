import { Rating } from "@mui/material";
import "./Comment.css";

function Comment({ review }) {
  return (
    <div>
      <Rating
        name={"Reviewer rate"}
        value={review.rate}
        size="small"
        readOnly
      />
      <p className="text-sm font-normal">{review.message}</p>
    </div>
  );
}

export default Comment;
