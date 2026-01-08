import { useParams } from "react-router-dom";
import { useState } from "react";
import "./StudentFeedback.css";

export default function StudentFeedback() {
  const { activityId } = useParams();
  const [sent, setSent] = useState(false);

  const sendFeedback = async (type) => {
    if (sent) return;

    await fetch(
      `http://localhost:4000/api/activities/${activityId}/feedback`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type }),
      }
    );

    setSent(true);
  };

  return (
    <div className="feedbackContainer">
      <h1>Trimite Feedback</h1>
      <p>Alege emoticonul care reprezinta feedbackul tau:</p>

      <div className={`emoticoane ${sent ? "disabled" : ""}`}>
        <span onClick={() => sendFeedback("happy")}>😊</span>
        <span onClick={() => sendFeedback("sad")}>😞</span>
        <span onClick={() => sendFeedback("surprised")}>😮</span>
        <span onClick={() => sendFeedback("confused")}>😕</span>
      </div>

      {sent && <p>Feedback trimis. Multumim!</p>}
    </div>
  );
}
