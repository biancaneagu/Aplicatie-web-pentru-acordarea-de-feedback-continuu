import {useState} from 'react';
import "./Student.css";

export default function Student() {
    const [code, setCode] = useState("");

    const handleJoin=() => {
        if(!code){
            alert("Introdu un cod valid!");
            return;
        }

        alert("Ai introdus codul: " + code);
    };

    return(
        <div className="studentContainer">
            <h1>Intra in activitate</h1>

            <p>Introdu codul primit de la profesor</p>

            <input className="studentInput"
             type="text"
             value={code}
             onChange={(e)=>setCode(e.target.value)}
             placeholder="Cod activitate"
             />

            <button className="studentButton" onClick={handleJoin}>Conecteaza-te</button>
           </div>
    );
}