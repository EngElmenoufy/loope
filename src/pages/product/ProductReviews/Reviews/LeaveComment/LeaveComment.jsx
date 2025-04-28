import { useState } from "react";
import Button from "../../../../../components/Button/Button";

function LeaveComment() {
  const [comment, setComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <form className="px-4 pb-4" onSubmit={(e) => handleAddComment(e)}>
      <textarea
        type="text"
        placeholder="Enter your comment here"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-3 rounded-lg w-full border border-[#18403C] shadow-md h-20 mb-4"
      />
      <Button type="main" text="Add comment" otherClass="!w-full" />
    </form>
  );
}

export default LeaveComment;
