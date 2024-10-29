// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/VisualizerPage";
import AlgorithmPage from "./pages/AlgorithmPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<VisualizerPage />} />
        <Route path="/explore/:algorithmId" element={<AlgorithmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
