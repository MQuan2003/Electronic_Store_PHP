import React, { useState } from "react";
import styles from "../../css/CommentAndRating.module.css";

const RatingComment = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Please select a rating before submitting.");
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div className={styles["rating-container"]}>
      <h3>Leave a Review</h3>
      <div className={styles["stars"]}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${star <= rating ? styles.selected : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button onClick={handleSubmit} className={styles["Submit-comment"]}>Submit</button>
    </div>
  );
};

export default RatingComment;
