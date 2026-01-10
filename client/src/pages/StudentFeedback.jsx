import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import "./StudentFeedback.css";

export default function StudentFeedback() {
  const { activityId } = useParams();
  const location = useLocation();
  const activity = location.state?.activity;

  const [statusMsg, setStatusMsg] = useState("");
  const [sending, setSending] = useState(false);

  const sendFeedback = async (type) => {
    if (sending) return;

    setSending(true);
    setStatusMsg("");

    try {
      const resp = await fetch(
        `http://localhost:4000/api/activities/${activityId}/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        }
      );

      const data = await resp.json();

      if (!resp.ok) {
        setStatusMsg(data?.message || "Nu am putut trimite feedback.");
        return;
      }

      setStatusMsg("Feedback trimis. Mulțumim! Poți trimite din nou oricând.");
    } catch (err) {
      console.error(err);
      setStatusMsg("Eroare de rețea. Verifică dacă serverul rulează.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="feedbackContainer">
      <h1>Trimite feedback</h1>

      {activity?.title ? (
        <p>
          Activitate: <b>{activity.title}</b>
        </p>
      ) : (
        <p>Activitate ID: <b>{activityId}</b></p>
      )}

      <p>Alege emoticonul care reprezintă feedback-ul tău:</p>

     <div className={`feedbackGrid ${sending ? "disabled" : ""}`}>
  <button
    className="feedbackOption"
    onClick={() => sendFeedback("SMILE")}
  >
    <span className="feedbackEmoji">😊</span>
    <span className="feedbackLabel">Smiley</span>
  </button>

  <button
    className="feedbackOption"
    onClick={() => sendFeedback("FROWN")}
  >
    <span className="feedbackEmoji">😞</span>
    <span className="feedbackLabel">Frowny</span>
  </button>

  <button
    className="feedbackOption"
    onClick={() => sendFeedback("SURPRISED")}
  >
    <span className="feedbackEmoji">😮</span>
    <span className="feedbackLabel">Surprised</span>
  </button>

  <button
    className="feedbackOption"
    onClick={() => sendFeedback("CONFUSED")}
  >
    <span className="feedbackEmoji">😕</span>
    <span className="feedbackLabel">Confused</span>
  </button>
</div>

      {statusMsg && <p style={{ marginTop: 12 }}>{statusMsg}</p>}
    </div>
  );
}
