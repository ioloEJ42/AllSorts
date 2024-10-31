import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrayBar, SortingAlgorithm } from "../types/sortingTypes";
import { Toaster, toast } from "react-hot-toast";
import { isPowerOf2 } from "../algorithms/bitonicSort";

interface AlgorithmTemplateProps {
  algorithm: SortingAlgorithm;
}

const AlgorithmTemplate: React.FC<AlgorithmTemplateProps> = ({ algorithm }) => {
  const [arraySize, setArraySize] = useState("50");
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [delay, setDelay] = useState<number>(50);
  const [shouldRegenerate, setShouldRegenerate] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sortStartTimeRef = useRef<number | null>(null);

  const generateArray = useCallback(() => {
    const newArray: ArrayBar[] = [];
    const size = parseInt(arraySize) || 50;
    const boundedSize = Math.min(Math.max(size, 5), 200);

    for (let i = 0; i < boundedSize; i++) {
      newArray.push({
        height: Math.floor(Math.random() * 400) + 10,
        value: Math.floor(Math.random() * 400) + 10,
        isComparing: false,
        isSorted: false,
      });
    }
    setArray(newArray);
    setShouldRegenerate(false);
  }, [arraySize]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value;
    if (/^\d*$/.test(newSize) && parseInt(newSize) <= 200) {
      if (algorithm.requiresPowerOf2) {
        const size = parseInt(newSize) || 0;
        if (size > 0 && !isPowerOf2(size)) {
          toast.error("Please enter a power of 2 (2, 4, 8, 16, 32, 64, 128)");
          return;
        }
      }
      setArraySize(newSize);
      setShouldRegenerate(true);
    }
  };

  const stopSorting = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsRunning(false);
    setIsSorting(false);

    // Update timer with elapsed time until stop
    if (sortStartTimeRef.current) {
      const elapsedTime = performance.now() - sortStartTimeRef.current;
      setTimeTaken(elapsedTime);
      sortStartTimeRef.current = null;
    }
  };

  interface ErrorWithName extends Error {
    name: string;
  }

  const handleSort = async () => {
    if (isRunning) {
      stopSorting();
      return;
    }

    if (algorithm.requiresPowerOf2 && !isPowerOf2(array.length)) {
      toast.error("Array size must be a power of 2 for this algorithm");
      return;
    }

    setIsRunning(true);
    setIsSorting(true);

    // Create new AbortController for this sorting run
    abortControllerRef.current = new AbortController();
    sortStartTimeRef.current = performance.now();

    try {
      await algorithm.execute(
        array,
        setArray,
        setTimeTaken,
        delay,
        abortControllerRef.current.signal
      );
      setIsRunning(false);
    } catch (error: unknown) {
      const err = error as ErrorWithName; // Type assertion
      if (err.name === "AbortError") {
        // Sorting was stopped by user, do nothing
      } else {
        console.error("Sorting error:", err);
      }
    } finally {
      setIsSorting(false);
    }
  };

  const handleRandomize = () => {
    setShouldRegenerate(true);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDelay = parseInt(e.target.value);
    setDelay(newDelay);
  };

  useEffect(() => {
    if (shouldRegenerate && !isSorting) {
      generateArray();
    }
  }, [shouldRegenerate, isSorting, generateArray]);

  useEffect(() => {
    document.title = `${algorithm.name} | All Sorts`;
    return () => {
      document.title = "All Sorts";
    };
  }, [algorithm.name]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [algorithm]);

  return (
    <div className="bg-black text-white">
      <Toaster position="top-right" />
      {/* Visualization Section */}
      <section className="relative min-h-screen">
        {/* Dotted background pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #808080 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            opacity: 0.3,
          }}
        />

        {/* Navigation */}
        <nav className="relative border-b border-gray-800 px-4">
          <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
            <Link to="/explore" className="text-xl font-semibold">
              All Sorts
            </Link>
            <h1 className="text-xl font-bold">{algorithm.name}</h1>
          </div>
        </nav>

        {/* Main content */}
        <div className="relative flex flex-col h-[calc(100vh-4rem)] p-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <button
              onClick={handleRandomize}
              disabled={isRunning}
              className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Randomize Array
            </button>

            <button
              onClick={handleSort}
              disabled={isSorting && !isRunning} // Only disabled during transitions
              className={`px-4 py-2 border transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          ${
            isRunning
              ? "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600"
              : "border-white text-white hover:bg-white hover:text-black"
          }`}
            >
              {isRunning ? "Stop Sorting" : "Start Sorting"}
            </button>

            <div className="flex items-center gap-4">
              <label className="text-sm">Speed:</label>
              <select
                value={delay}
                onChange={handleSpeedChange}
                disabled={isRunning}
                className="bg-black border border-gray-800 text-white px-2 py-1 rounded focus:outline-none focus:border-gray-600"
              >
                <option className="bg-black text-white" value="100">
                  Slow
                </option>
                <option className="bg-black text-white" value="50">
                  Normal
                </option>
                <option className="bg-black text-white" value="25">
                  Fast
                </option>
                <option className="bg-black text-white" value="10">
                  Very Fast
                </option>
                <option className="bg-black text-white" value="5">
                  Ultra Fast
                </option>
              </select>
            </div>

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
              <span className="font-mono text-gray-400">
                {timeTaken.toFixed(2)}ms
              </span>
            </div>
          </div>

          {/* Array visualization container - now takes up remaining height */}
          <div className="flex-1 border border-gray-800 rounded flex items-end justify-end gap-[2px] p-4 bg-zinc-900/75">
            {array.map((bar: ArrayBar, index: number) => (
              <div
                key={index}
                className={`w-1 transition-all duration-200 ${
                  bar.isComparing
                    ? "bg-yellow-500"
                    : bar.isSorted
                    ? "bg-green-500"
                    : "bg-white"
                }`}
                style={{ height: `${bar.height}px` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="min-h-screen bg-zinc-900 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Algorithm Description */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">How it Works</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {algorithm.description}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Step by Step</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-400">
                  {algorithm.stepDescription.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
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
                        <span className="font-mono">
                          {algorithm.timeComplexity.best}
                        </span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span>Average Case:</span>
                        <span className="font-mono">
                          {algorithm.timeComplexity.average}
                        </span>
                      </li>
                      <li className="flex justify-between items-center border-b border-gray-800 pb-2">
                        <span>Worst Case:</span>
                        <span className="font-mono">
                          {algorithm.timeComplexity.worst}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Space Complexity
                    </h3>
                    <p className="font-mono">{algorithm.spaceComplexity}</p>
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
