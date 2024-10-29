// src/pages/VisualizerPage.tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { algorithmRegistry } from "../algorithms/registry";

const VisualizerPage = () => {
  const categorizedAlgorithms = {
    logarithmic: Object.values(algorithmRegistry)
      .filter(algo => algo.component.category === 'logarithmic'),
    quadratic: Object.values(algorithmRegistry)
      .filter(algo => algo.component.category === 'quadratic'),
    odd: Object.values(algorithmRegistry)
      .filter(algo => algo.component.category === 'odd')
  };
  useEffect(() => {
    document.title = "Explore Algorithms | All Sorts";
    return () => {
      document.title = "All Sorts";
    };
  }, []);
  
  // Component for rendering algorithm cards
  const AlgorithmCard = ({ algo }: { algo: typeof algorithmRegistry[keyof typeof algorithmRegistry] }) => (
    <Link
      key={algo.path}
      to={`/explore/${algo.path}`}
      className="block p-6 border border-gray-800 hover:border-gray-700 transition-colors rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-3">{algo.title}</h2>
      <p className="text-gray-400 mb-4">{algo.description}</p>
      <p className="text-sm text-gray-500">
        Time Complexity: {algo.component.timeComplexity.average}
      </p>
    </Link>
  );

  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800 px-4">
        <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-semibold text-white">
            All Sorts
          </Link>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">
          Choose an Algorithm
        </h1>

        {/* Logarithmic Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
            Logarithmic Time Complexity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorizedAlgorithms.logarithmic.map((algo) => (
              <AlgorithmCard key={algo.path} algo={algo} />
            ))}
          </div>
        </section>

        {/* Quadratic Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
            Quadratic Time Complexity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorizedAlgorithms.quadratic.map((algo) => (
              <AlgorithmCard key={algo.path} algo={algo} />
            ))}
          </div>
        </section>

                {/* Odd Section */}
                <section>
          <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
            Odd & Unique Sorts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categorizedAlgorithms.odd.map((algo) => (
              <AlgorithmCard key={algo.path} algo={algo} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default VisualizerPage;