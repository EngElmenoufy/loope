import { useState } from "react";
import { Rating } from "@mui/material";
import Button from "../../../../../components/Button/Button";

function LeaveComment({ onAddReview, setIsLeaveComment }) {
  const [addReview, setAddReview] = useState({
    rate: 0,
    message: "",
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    onAddReview(addReview);
    setIsLeaveComment(false);
    // setComment("");
  };

  return (
    <form className="px-4 pb-4" onSubmit={(e) => handleAddComment(e)}>
      <Rating
        name={"Reviewer rate"}
        value={addReview.rate}
        onChange={(e) =>
          setAddReview((prev) => ({ ...prev, rate: e.target.value }))
        }
        size="medium"
      />
      <textarea
        type="text"
        placeholder="Enter your comment here"
        value={addReview.message}
        onChange={(e) =>
          setAddReview((prev) => ({ ...prev, message: e.target.value }))
        }
        className="p-3 rounded-lg w-full border border-[#18403C] shadow-md h-20 mb-4"
      />
      <Button type="main" text="Add comment" otherClass="!w-full" />
    </form>
  );
}

export default LeaveComment;
