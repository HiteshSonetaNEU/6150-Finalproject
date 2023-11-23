import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Login from "./Components/Login";
import Home from "./Components/Home";


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
