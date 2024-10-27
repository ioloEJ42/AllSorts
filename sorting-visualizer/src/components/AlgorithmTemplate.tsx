import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

interface AlgorithmTemplateProps {
  title: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
}

interface ArrayBar {
  height: number;
  value: number;
}

const AlgorithmTemplate: React.FC<AlgorithmTemplateProps> = ({
  title,
  description,
  timeComplexity,
  spaceComplexity,
}) => {
  const [arraySize, setArraySize] = useState("50");
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [isSorting] = useState(false); // Removed setIsSorting since it's not used yet
  const [timeTaken] = useState<string>("0.00"); // Removed setTimeTaken since it's not used yet

  // Wrap generateArray in useCallback to prevent recreating on every render
  const generateArray = useCallback(() => {
    const newArray: ArrayBar[] = [];
    const size = parseInt(arraySize) || 50;

    // Ensure size is within reasonable bounds
    const boundedSize = Math.min(Math.max(size, 5), 200);

    for (let i = 0; i < boundedSize; i++) {
      const value = Math.floor(Math.random() * 400) + 10; // Random value between 10 and 410
      newArray.push({
        height: value,
        value: value,
      });
    }
    setArray(newArray);
  }, [arraySize]);

  // Handle array size input change
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    // Only allow numbers
    if (/^\d*$/.test(newSize) && parseInt(newSize) <= 200) {
      setArraySize(newSize);
    }
  };

  // Generate new array when size changes
  useEffect(() => {
    if (!isSorting) {
      generateArray();
    }
  }, [generateArray, isSorting]); // Added proper dependencies

  return (
    <div className="bg-black text-white">
      {/* Visualization Section - Full Screen */}
      <section className="h-screen flex flex-col">
        <nav className="border-b border-gray-800 px-4">
          <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-semibold">
              All Sorts
            </Link>
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
        </nav>

        <div className="flex-1 flex flex-col p-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <button
              onClick={generateArray}
              disabled={isSorting}
              className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate New Array
            </button>

            <button
              disabled={true} // Will be enabled when we implement sorting
              className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Sorting
            </button>

            <div className="flex items-center gap-4">
              <label className="text-sm">Array Size:</label>
              <input
                type="text"
                value={arraySize}
                onChange={handleSizeChange}
                disabled={isSorting}
                className="w-20 px-2 py-1 bg-transparent border border-gray-800 text-white disabled:opacity-50"
                placeholder="50"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm">Time:</label>
              <span className="font-mono text-gray-400">{timeTaken}ms</span>
            </div>
          </div>

          {/* Visualization Area - Right Aligned Bars */}
          <div className="flex-1 border border-gray-800 rounded flex items-end justify-end gap-[2px] p-4 bg-zinc-900/50">
            {array.map((bar, index) => (
              <div
                key={index}
                className="w-1 bg-white transition-all duration-200"
                style={{ height: `${bar.height}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Information Section - Full Screen */}
      <section className="min-h-screen bg-zinc-900 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Algorithm Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">How it Works</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {description}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Step by Step</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-400">
                  <li>First pass through the array</li>
                  <li>Compare adjacent elements</li>
                  <li>Swap if they are in wrong order</li>
                  <li>Repeat until no swaps needed</li>
                </ol>
              </div>
            </div>

            {/* Complexity Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Complexity Analysis</h2>
                <div className="space-y-6 text-gray-400">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Time Complexity
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span>Best Case:</span>
                        <span className="font-mono">{timeComplexity.best}</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span>Average Case:</span>
                        <span className="font-mono">
                          {timeComplexity.average}
                        </span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span>Worst Case:</span>
                        <span className="font-mono">
                          {timeComplexity.worst}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Space Complexity
                    </h3>
                    <p className="font-mono">{spaceComplexity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AlgorithmTemplate;
