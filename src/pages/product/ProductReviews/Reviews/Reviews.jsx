import { useState } from "react";
import ReviewerComment from "./ReviewerComment/ReviewerComment";
import LeaveComment from "./LeaveComment/LeaveComment";

function Reviews() {
  const [isLeaveComment, setIsLeaveComment] = useState(false);

  const handleLeaveComment = () => {
    setIsLeaveComment((isLeave) => !isLeave);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="max-md:text-lg">Most relevant reviews</h4>
        <div role="button" className="see-more-link py-2">
          <span className="text-nowrap">see all</span>
          <span className="!w-8">
            <img
              src="icons/arrow-right-alt.png"
              alt="see more products"
              className="icon"
            />
          </span>
        </div>
      </div>
      <div className="border-b border-[#18403C]">
        <ReviewerComment />
        <ReviewerComment />
        <ReviewerComment />
        <ReviewerComment />
        <ReviewerComment />
        <ReviewerComment />
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
          <img
            src={
              isLeaveComment
                ? "icons/arrow-right-alt-red.png"
                : "icons/arrow-right-alt.png"
            }
            alt="see more products"
            className="icon"
          />
        </span>
      </div>
      {isLeaveComment && <LeaveComment />}
      {/* <button className="text-[#18403C] py-2">+ leave comment</button> */}
    </div>
  );
}

export default Reviews;
