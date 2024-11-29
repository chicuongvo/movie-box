import { useState, useEffect } from "react";
import styles from "./FeedbackList.module.css";
import avatar from "../../../assets/avatar.png";

interface Feedback {
  id: number;
  _id?: string;
  username: string;
  feedback: string;
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [username, setUsername] = useState("");

  // Fetch feedback từ API khi component được tải
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          "https://backend-movie-app-0pio.onrender.com/feedback"
        );
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setFeedbacks(data.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Hàm xử lý khi thêm feedback mới
  const handleAddFeedback = async () => {
    if (newFeedback.trim() && username.trim()) {
      const feedback: Feedback = {
        id: feedbacks.length + 1,
        username,
        feedback: newFeedback,
      };

      try {
        const response = await fetch(
          "https://backend-movie-app-0pio.onrender.com/feedback",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(feedback),
          }
        );

        if (response.ok) {
          setFeedbacks([...feedbacks, feedback]);
          setNewFeedback("");
          setUsername("");
          console.log(feedbacks);
        } else {
          console.error("Failed to add feedback");
        }
      } catch (error) {
        console.error("Error adding feedback:", error);
      }
    }
  };

  return (
    <div className={styles["feedback-wrapper"]}>
      <div className={styles["feedback-title"]}>FEEDBACK</div>

      <ul className={styles["feedback-container"]}>
        {feedbacks.slice(-3).map(feedback => (
          <li key={feedback._id} className={styles["feedback-content"]}>
            <div className={styles["feedback"]}>{feedback.feedback}</div>
            <div className={styles["user-info"]}>
              <img src={avatar} alt="avatar" className={styles["avatar"]} />
              <div className={styles["username"]}>{feedback.username}</div>
            </div>
          </li>
        ))}
      </ul>

      <hr className={styles["divider"]} />

      <div className={styles["send-feedback"]}>
        <div className={styles["send-feedback-title"]}>SEND YOUR FEEDBACK</div>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          className={styles["your-name"]}
          onChange={e => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Write your feedback here..."
          value={newFeedback}
          className={styles["your-feedback"]}
          onChange={e => setNewFeedback(e.target.value)}
        />
        <button onClick={handleAddFeedback} className={styles["add-feedback"]}>
          Add Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackList;
