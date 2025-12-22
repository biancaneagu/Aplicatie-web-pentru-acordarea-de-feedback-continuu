import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesor from "./pages/Profesor";
import Student from "./pages/Student";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profesor" element={<Profesor />} />
      <Route path="/student" element={<Student />} />
    </Routes>
  );
}

export default App;
