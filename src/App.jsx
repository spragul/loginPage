import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./loginpage/LoginPage";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
