import { Link } from "react-router-dom";

const VisualizerPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-semibold text-white">
              All Sorts
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-12">
          Choose an Algorithm
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AlgorithmCard
            title="Bubble Sort"
            description="A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
            complexity="O(n²)"
            link="/visualizer/bubble-sort"
          />
          {/* Add more algorithm cards here as we implement them */}
        </div>
      </main>
    </div>
  );
};

interface AlgorithmCardProps {
  title: string;
  description: string;
  complexity: string;
  link: string;
}

const AlgorithmCard = ({
  title,
  description,
  complexity,
  link,
}: AlgorithmCardProps) => {
  return (
    <Link
      to={link}
      className="block p-6 border border-gray-800 hover:border-gray-700 transition-colors rounded-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <p className="text-sm text-gray-500">Time Complexity: {complexity}</p>
    </Link>
  );
};

export default VisualizerPage;
