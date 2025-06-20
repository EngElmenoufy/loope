import { useState } from "react";
import ReviewerComment from "./ReviewerComment/ReviewerComment";
import LeaveComment from "./LeaveComment/LeaveComment";
import { Alert } from "@mui/material";

function Reviews({ productReviews, onAddReview }) {
  const [isLeaveComment, setIsLeaveComment] = useState(false);

  const handleLeaveComment = () => {
    setIsLeaveComment((isLeave) => !isLeave);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h4 className="max-md:text-lg">Most relevant reviews</h4>
      </div>
      <div className="border-b border-[#18403C]">
        {productReviews.length > 0 &&
          productReviews.map((review) => (
            <ReviewerComment key={review._id} review={review} />
          ))}
      </div>
      <div
        role="button"
        className="see-more-link py-4 w-fit"
        onClick={handleLeaveComment}
      >
        <span
          className={`text-nowrap ${isLeaveComment ? "text-[#E14627]" : ""}`}
        >
          {isLeaveComment ? "close" : "leave a comment"}
        </span>
        <span className="!w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#18403c"
          >
            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
          </svg>
        </span>
      </div>
      {isLeaveComment && (
        <LeaveComment
          onAddReview={onAddReview}
          setIsLeaveComment={setIsLeaveComment}
        />
      )}
      {/* <button className="text-[#18403C] py-2">+ leave comment</button> */}
    </div>
  );
}

export default Reviews;
