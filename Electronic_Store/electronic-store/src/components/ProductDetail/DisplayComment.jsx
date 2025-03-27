import styles from "../../css/DisplayComment.module.css";

const DisplayComment = ({ review }) => {
    return (
        <div className={styles["Comment"]}>
            <div className={styles["user-rating"]}>
                <div className={styles["user-info"]}>
                    <div className={styles["user-details"]}>
                        <img
                            src="https://www.gravatar.com/avatar/?d=mp"
                            alt="User Avatar"
                            className={styles["avatar"]}
                        />
                        <span>{review.user_name}</span>
                        <span style={{ color: "#9E9E9E" }}>
                            {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <div>
                        <span className={styles["rating"]}>
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles["user-comment"]}>
                <span>{review.comment}</span>
            </div>
        </div>
    );
};

export default DisplayComment;
