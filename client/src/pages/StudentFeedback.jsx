import "./StudentFeedback.css";

export default function StudentFeedback() {

    const sendFeedback = async (type)=>{
        alert("Ai trimis feedback: " + type);

    
    };
    return (
        <div className="feedbackContainer">
      <h1>Trimite Feedback</h1>
      <p>Alege emoticonul care reprezinta feedbackul tau:</p>

      <div className="emoticoane">
        <span onClick={() => sendFeedback("happy")}>😊</span>
        <span onClick={() => sendFeedback("sad")}>😞</span>
        <span onClick={() => sendFeedback("surprised")}>😮</span>
        <span onClick={() => sendFeedback("confused")}>😕</span>
      </div>
    </div>
    )
}