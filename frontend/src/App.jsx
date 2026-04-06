import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PreferenceForm from "./pages/PreferenceForm";
import MatchResult from "./pages/MatchResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/preferences" element={<PreferenceForm />} />
        <Route path="/match" element={<MatchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;