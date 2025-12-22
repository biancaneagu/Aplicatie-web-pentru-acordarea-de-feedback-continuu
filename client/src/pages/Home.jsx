import {Link} from "react-router-dom";
import "./Home.css";

export default function Home() {
    return(
        <div className="home-container">
            <h1 className="home-title">Feedback Continuu</h1>

            <h3 className="home-text">Alege rolul pentru a continua</h3>

            <div className="home-buttons">
                <Link to="/profesor">
                <button className="button">Profesor</button>
                </Link>

                <Link to="/student">
                <button className="button">Student</button>
                </Link>
            </div>

        </div>
    );
}