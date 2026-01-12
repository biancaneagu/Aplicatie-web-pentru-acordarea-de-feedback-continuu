import { useEffect, useMemo, useState } from "react";
import "./Profesor.css";

// URL-ul pentru API luat dintr-o variabila de mediu
const API = `${import.meta.env.VITE_API_URL}/api`;

//functie pentru formatarea datei si orei
function formatDateTime(value) {
  if (!value) return "-";
  const d = new Date(value);
  return d.toLocaleString("ro-RO");
}

function emojiForType(type) {
  switch (type) {
    case "SMILE":
      return "😊";
    case "FROWN":
      return "😞";
    case "SURPRISED":
      return "😮";
    case "CONFUSED":
      return "😕";
    default:
      return "❓";
  }
}

export default function Profesor() {
  // State-uri pentru formularul de creare activitate
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // State-uri pentru datele primite de la server
  const [activities, setActivities] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [summary, setSummary] = useState(null);

  // State-uri pentru monitorizare status si erori
  const [lastUpdate, setLastUpdate] = useState(null);
  const [externalError, setExternalError] = useState("");
  const [loadingExternal, setLoadingExternal] = useState(false);

  // State-uri pentru feedback vizual (loading, mesaje succes/eroare)
  const [message, setMessage] = useState("");
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [creating, setCreating] = useState(false);

  // Folosim useMemo ca sa nu cautam prin array la fiecare render
  const selectedActivity = useMemo(
    () => activities.find((a) => String(a.id) === String(selectedId)),
    [activities, selectedId]
  );

  // Incarca lista de activitati din backend
  async function loadActivities() {
    setLoadingActivities(true);
    setMessage("");
    try {
      const resp = await fetch(`${API}/activities`);
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Eroare la activități");
      setActivities(data);
      if (!selectedId && data.length > 0) {
        setSelectedId(String(data[0].id));
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoadingActivities(false);
    }
  }

  // Functie care ia tot feedback-ul pentru o activitate specifica si calculeaza sumarul
  async function loadFeedback(activityId) {
    if (!activityId) return;
    setLoadingFeedback(true);
    setMessage("");
    try {
      const resp = await fetch(`${API}/activities/${activityId}/feedback`);
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Eroare la feedback");
      setTimeline(data);

      const s = { SMILE: 0, FROWN: 0, SURPRISED: 0, CONFUSED: 0 };
      data.forEach((f) => {
        if (s[f.type] !== undefined) s[f.type]++;
      });
      setSummary(s);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoadingFeedback(false);
    }
  }

  // Verifica statusul serviciului extern
  async function loadExternalStatus() {
    setExternalError("");
    setLoadingExternal(true);
    try {
      const resp = await fetch(`${API}/external/status`);
      const data = await resp.json();
      if (!resp.ok)
        throw new Error(data?.message || "Eroare la serviciul extern");

      setLastUpdate(data.updatedAt);
    } catch (err) {
      setExternalError(err.message || "Eroare la serviciul extern");
      setLastUpdate(null);
    } finally {
      setLoadingExternal(false);
    }
  }

  // La montarea componentei incarcam activitatile si statusul aplicatiei
  useEffect(() => {
    loadActivities();
    loadExternalStatus();
  }, []);

  // Cand se schimba activitatea selectata, reincarcam feedback-ul
  useEffect(() => {
    if (selectedId) loadFeedback(selectedId);
  }, [selectedId]);

  // Creeaza o activitate noua
  async function handleCreateActivity(e) {
    e.preventDefault();
    setMessage("");

    if (!title || !description || !startTime || !endTime) {
      setMessage("Completează toate câmpurile.");
      return;
    }

    setCreating(true);
    try {
      const resp = await fetch(`${API}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, startTime, endTime }),
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.message || "Eroare la creare");

      // Resetam formularul si afisam mesaj de succes
      setMessage(`Activitate creată cu succes! Cod: ${data.code}`);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");

      await loadActivities();
      setSelectedId(String(data.id));
    } catch (err) {
      setMessage(err.message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="profesorPage">
      <h1>Dashboard Profesor</h1>
      <p>Creare activitate și feedback anonim în timp real</p>

      {message && <div className="profMessage">{message}</div>}

      <div className="profGrid">
        <section className="card">
          <h2>Creează activitate</h2>
          <form className="form" onSubmit={handleCreateActivity}>
            <input
              placeholder="Titlu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Descriere"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label>
              Start:
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>

            <label>
              End:
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>

            <button disabled={creating}>
              {creating ? "Se creează..." : "Creează"}
            </button>
          </form>
        </section>

        <section className="card">
          <h2>Activități</h2>

          {loadingActivities ? (
            <p>Se încarcă activitățile...</p>
          ) : activities.length === 0 ? (
            <p>Nu există activități.</p>
          ) : (
            <>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {activities.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>

              {selectedActivity && (
                <div className="activityInfo">
                  <p>
                    <b>Cod:</b> {selectedActivity.code}
                  </p>
                  <p>
                    <b>Interval:</b>{" "}
                    {formatDateTime(selectedActivity.startTime)} –{" "}
                    {formatDateTime(selectedActivity.endTime)}
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <section className="card">
          <h2>Sumar feedback</h2>

          {!summary ? (
            <p>Nu există feedback.</p>
          ) : (
            <ul>
              <li>😊 SMILE: {summary.SMILE}</li>
              <li>😞 FROWN: {summary.FROWN}</li>
              <li>😮 SURPRISED: {summary.SURPRISED}</li>
              <li>😕 CONFUSED: {summary.CONFUSED}</li>
            </ul>
          )}
        </section>

        <section className="card wide">
          <h2>Timeline feedback</h2>

          {loadingFeedback ? (
            <p>Se încarcă feedback-ul...</p>
          ) : timeline.length === 0 ? (
            <p>Nu există feedback pentru această activitate.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Moment</th>
                  <th>Reacție</th>
                  <th>Tip</th>
                </tr>
              </thead>
              <tbody>
                {timeline.map((f, i) => (
                  <tr key={f.id}>
                    <td>{i + 1}</td>
                    <td>{formatDateTime(f.createdAt)}</td>
                    <td>{emojiForType(f.type)}</td>
                    <td>{f.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="card wide">
          <h2>Informații aplicație</h2>

          {loadingExternal ? (
            <p>Se încarcă informațiile...</p>
          ) : lastUpdate ? (
            <p>
              <b>Ultima actualizare a aplicației:</b>{" "}
              {formatDateTime(lastUpdate)}
            </p>
          ) : (
            <p>Date indisponibile.</p>
          )}

          <button
            type="button"
            onClick={loadExternalStatus}
            style={{
              marginTop: 10,
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.15)",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Refresh
          </button>

          {externalError && (
            <div style={{ color: "crimson", marginTop: 8 }}>
              {externalError}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
