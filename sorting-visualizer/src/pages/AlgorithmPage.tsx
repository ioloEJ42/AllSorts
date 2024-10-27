// src/pages/AlgorithmPage.tsx
import { useParams, Navigate } from "react-router-dom";
import AlgorithmTemplate from "../components/AlgorithmTemplate";
import { algorithmRegistry } from "../algorithms/registry";

const AlgorithmPage = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();

  // Find the algorithm in registry
  const algorithm = Object.values(algorithmRegistry).find(
    (algo) => algo.path === algorithmId
  );

  if (!algorithm) {
    return <Navigate to="/visualizer" replace />;
  }

  return <AlgorithmTemplate algorithm={algorithm.component} />;
};

export default AlgorithmPage;
