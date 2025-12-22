import {Link} from "react-router-dom";

export default function Home() {
    return(
        <div>
            <h1>Feedback Continuu</h1>

            <div>
                <Link to="/profesor">
                <button>Profesor</button>
                </Link>

                <Link to="/student">
                <button>Student</button>
                </Link>
            </div>

        </div>
    );
}