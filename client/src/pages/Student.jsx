import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";

export default function Student() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!code) {
      alert("Introdu un cod valid!");
      return;
    }

    navigate("/feedback/1");
  };

  return (
    <div className="studentContainer">
      <h1>Intra in activitate</h1>
      <p>Introdu codul primit de la profesor</p>

      <input
        className="studentInput"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Cod activitate"
      />

      <button className="studentButton" onClick={handleJoin}>
        Conecteaza-te
      </button>
    </div>
  );
}
