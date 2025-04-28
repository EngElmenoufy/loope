import Comment from "./Comment/Comment";
import Reviewer from "./Reviewer/Reviewer";

function ReviewerComment() {
  return (
    <div className="pt-3 pb-5 border-b border-[#E1E2DE]">
      <Reviewer />
      <Comment />
    </div>
  );
}

export default ReviewerComment;
