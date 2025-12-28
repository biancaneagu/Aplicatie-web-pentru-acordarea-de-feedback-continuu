import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profesor from "./pages/Profesor";
import Student from "./pages/Student";
import StudentFeedback  from "./pages/StudentFeedback";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profesor" element={<Profesor />} />
      <Route path="/student" element={<Student />} />
      <Route path="/student/feedback" element={<StudentFeedback />} />
    </Routes>
  );
}

export default App;
