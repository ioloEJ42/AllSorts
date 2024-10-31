import { Link } from "react-router-dom";
import AnimatedTitle from "../components/AnimatedTitle";
import { algorithmRegistry } from "../algorithms/registry";

const HomePage = () => {
  const categorizedAlgorithms = {
    logarithmic: Object.values(algorithmRegistry)
      .filter((algo) => algo.component.category === "logarithmic")
      .map((algo) => algo.title),
    quadratic: Object.values(algorithmRegistry)
      .filter((algo) => algo.component.category === "quadratic")
      .map((algo) => algo.title),
    odd: Object.values(algorithmRegistry)
      .filter((algo) => algo.component.category === "odd")
      .map((algo) => algo.title),
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Dotted background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
          opacity: 0.2,
        }}
      />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <AnimatedTitle />
        <p className="text-xl md:text-2xl text-gray-300 mt-8 mb-8">
          Compare and visualise sorting algorithms
        </p>
        <div className="font-mono text-sm text-gray-500 space-x-4">
          <span>Free</span>
          <span>·</span>
          <span>Fast</span>
          <span>·</span>
          <span>Efficient</span>
        </div>
        <Link
          to="/explore"
          className="mt-12 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Start Exploring
        </Link>
      </div>

      {/* Information Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Why All-Sorts?
            </h2>
            <p className="text-xl text-gray-400">
              Understanding sorting algorithms is fundamental to computer
              science. I make it intuitive through visual learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Logarithmic Section */}
            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-6 uppercase tracking-wider">
                Logarithmic Complexity
              </h3>
              <ul className="space-y-4">
                {categorizedAlgorithms.logarithmic.map((algo) => (
                  <li
                    key={algo}
                    className="text-2xl font-light text-white hover:text-gray-300 transition-colors"
                  >
                    {algo}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quadratic Section */}
            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-6 uppercase tracking-wider">
                Quadratic Complexity
              </h3>
              <ul className="space-y-4">
                {categorizedAlgorithms.quadratic.map((algo) => (
                  <li
                    key={algo}
                    className="text-2xl font-light text-white hover:text-gray-300 transition-colors"
                  >
                    {algo}
                  </li>
                ))}
              </ul>
            </div>

            {/* Odd Section */}
            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-6 uppercase tracking-wider">
                Odd Algorithms
              </h3>
              <ul className="space-y-4">
                {categorizedAlgorithms.odd.map((algo) => (
                  <li
                    key={algo}
                    className="text-2xl font-light text-white hover:text-gray-300 transition-colors"
                  >
                    {algo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
