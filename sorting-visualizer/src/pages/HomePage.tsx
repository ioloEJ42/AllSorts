import { Link } from "react-router-dom";
import AnimatedTitle from "../components/AnimatedTitle";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #808080 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          opacity: 0.3,
        }}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <AnimatedTitle />
        <p className="text-xl md:text-2xl text-gray-300 mt-8 mb-8">
          Compare and visualise sorting algorithms
        </p>
        <p className="text-gray-400 font-mono">
          free · fast · efficient · also free
        </p>
        <Link
          to="/visualizer"
          className="mt-12 px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          Start Exploring
        </Link>
      </div>

      {/* Features Section - Also full height */}
      <section className="min-h-screen flex items-center justify-center bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why All Sorts?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Understanding sorting algorithms is fundamental to computer
              science. We make it intuitive through visual learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              title="Interactive Learning"
              description="Watch algorithms work in real-time. Adjust speed, array size, and see exactly how each algorithm makes its decisions."
              icon="⚡"
            />
            <FeatureCard
              title="Compare & Understand"
              description="See multiple sorting algorithms side by side. Understand their strengths, weaknesses, and optimal use cases."
              icon="🔄"
            />
            <FeatureCard
              title="Step-by-Step"
              description="Break down complex algorithms into simple, digestible steps. Perfect for students and developers alike."
              icon="📚"
            />
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Available Algorithms
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-gray-400 font-mono">
              {algorithms.map((algo) => (
                <span
                  key={algo}
                  className="px-4 py-2 border border-gray-800 rounded-full hover:border-gray-600 transition-colors duration-300"
                >
                  {algo}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link
              to="/visualizer"
              className="inline-block px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="border border-gray-800 p-8 hover:border-gray-700 transition-colors duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

const algorithms = [
  "Bubble Sort",
  "Quick Sort",
  "Merge Sort",
  "Heap Sort",
  "Insertion Sort",
  "Selection Sort",
];

export default HomePage;
