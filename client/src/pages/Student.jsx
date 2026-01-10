import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";

export default function Student() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    setErrorMsg("");

    if (!code.trim()) {
      setErrorMsg("Introdu un cod valid!");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch("http://localhost:4000/api/activities/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErrorMsg(data?.message || "Nu am putut intra în activitate.");
        return;
      }

      navigate(`/feedback/${data.id}`, { state: { activity: data } });
    } catch (err) {
      console.error(err);
      setErrorMsg("Eroare de rețea. Verifică dacă serverul rulează.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="studentContainer">
      <h1>Intră în activitate</h1>
      <p>Introdu codul primit de la profesor</p>

      <input
        className="studentInput"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Cod activitate"
      />

      <button className="studentButton" onClick={handleJoin} disabled={loading}>
        {loading ? "Se conectează..." : "Conectează-te"}
      </button>

      {errorMsg && <p style={{ color: "crimson", marginTop: 12 }}>{errorMsg}</p>}
    </div>
  );
}
