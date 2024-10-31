// src/pages/VisualizerPage.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { algorithmRegistry } from "../algorithms/registry";

const VisualizerPage = () => {
  const categorizedAlgorithms = {
    logarithmic: Object.values(algorithmRegistry).filter(
      (algo) => algo.component.category === "logarithmic"
    ),
    quadratic: Object.values(algorithmRegistry).filter(
      (algo) => algo.component.category === "quadratic"
    ),
    odd: Object.values(algorithmRegistry).filter(
      (algo) => algo.component.category === "odd"
    ),
  };

  useEffect(() => {
    document.title = "Explore Algorithms | All Sorts";
    return () => {
      document.title = "All Sorts";
    };
  }, []);

  const AlgorithmCard = ({
    algo,
  }: {
    algo: (typeof algorithmRegistry)[keyof typeof algorithmRegistry];
  }) => (
    <Link
      key={algo.path}
      to={`/explore/${algo.path}`}
      className="group relative block p-6 border border-gray-800 hover:border-white/25 transition-all duration-300 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 hover:shadow-lg hover:shadow-white/5"
    >
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
          {algo.title}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300">
          {algo.description}
        </p>
        <div className="pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Time Complexity:</span>
            <span className="font-mono text-gray-400 group-hover:text-white/75">
              {algo.component.timeComplexity.average}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center space-x-4 mb-6">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Navigation */}
      <nav className="relative border-b border-gray-800/50 backdrop-blur-sm px-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-xl font-semibold text-white hover:text-gray-300 transition-colors"
          >
            All Sorts
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Choose an Algorithm
        </h1>

        {/* Sections */}
        <div className="space-y-20">
          <section>
            <SectionHeader title="Logarithmic Time Complexity" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedAlgorithms.logarithmic.map((algo) => (
                <AlgorithmCard key={algo.path} algo={algo} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Quadratic Time Complexity" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedAlgorithms.quadratic.map((algo) => (
                <AlgorithmCard key={algo.path} algo={algo} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Odd & Unique Sorts" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedAlgorithms.odd.map((algo) => (
                <AlgorithmCard key={algo.path} algo={algo} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VisualizerPage;
