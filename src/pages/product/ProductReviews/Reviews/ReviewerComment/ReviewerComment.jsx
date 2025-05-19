import { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import Reviewer from "./Reviewer/Reviewer";

function ReviewerComment({ review }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.data) {
          setUserData(data.data);
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    };

    getUserData(review.userId);
  }, []);

  return (
    <div className="pt-3 pb-5 border-b border-[#E1E2DE]">
      <Reviewer userData={userData} />
      <Comment review={review} />
    </div>
  );
}

export default ReviewerComment;
