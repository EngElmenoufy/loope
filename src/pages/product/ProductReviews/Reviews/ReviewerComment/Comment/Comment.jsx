import { Rating } from "@mui/material";
import "./Comment.css";

function Comment() {
  return (
    <div>
      <Rating name={"Reviewer rate"} value={4} size="small" readOnly />
      <h5>Great value, great fit</h5>
      <span className="text-[#9FAAA6] font-light text-sm">10 March 2025</span>
      <p className="text-sm font-normal">
        Work's perfectly in my 2012 Corolla. Looks like genuine Lexus/Toyota
        parts. Great value. Scan tool and TPMS computer read it fine. Dash light
        is off!
      </p>
    </div>
  );
}

export default Comment;
