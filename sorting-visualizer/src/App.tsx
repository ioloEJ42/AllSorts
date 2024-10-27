// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/VisualizerPage";
import AlgorithmPage from "./pages/AlgorithmPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
        <Route path="/visualizer/:algorithmId" element={<AlgorithmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
