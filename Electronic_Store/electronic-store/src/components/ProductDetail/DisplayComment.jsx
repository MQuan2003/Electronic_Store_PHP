import styles from "../../css/DisplayComment.module.css"
const DisplayComment = () => {
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
                        <span>Username</span>
                        <span style={{ color: "#9E9E9E" }}>2-8-2024</span>
                    </div>
                    <div>
                        <span className={styles["rating"]}><i className="bi bi-star-fill star-icon"></i> 4.8</span>
                    </div>
                </div>
            </div>
            <div className={styles["user-comment"]}>
                <span>Comment</span>

            </div>
        </div>
    )
}

export default DisplayComment