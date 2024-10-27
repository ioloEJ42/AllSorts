import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualizerPage from "./pages/VisualizerPage";
import BubbleSort from "./pages/BubbleSort";
import SelectionSort from "./pages/SelectionSort";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
        <Route path="/visualizer/bubble-sort" element={<BubbleSort />} />
        <Route path="/visualizer/selection-sort" element={<SelectionSort />} />
      </Routes>
    </Router>
  );
}

export default App;
