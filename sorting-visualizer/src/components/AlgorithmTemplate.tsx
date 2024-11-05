import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrayBar, SortingAlgorithm } from "../types/sortingTypes";
import { Toaster, toast } from "react-hot-toast";
import { isPowerOf2 } from "../algorithms/bitonicSort";

interface AlgorithmTemplateProps {
  algorithm: SortingAlgorithm;
}

const AlgorithmTemplate: React.FC<AlgorithmTemplateProps> = ({ algorithm }) => {
  // Acessibility
  const randomizeButtonRef = useRef<HTMLButtonElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);

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
    <div
      className="bg-black text-white"
      role="main"
      aria-label={`${algorithm.name} Visualization`}
    >
      <Toaster position="top-right" />

      {/* Visualization Section */}
      <section
        className="relative min-h-screen"
        aria-label="Algorithm Visualization"
      >
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle, #808080 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
            opacity: 0.3,
          }}
        />

        <nav
          className="relative border-b border-gray-800 px-4"
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
            <Link
              to="/explore"
              className="text-xl font-semibold"
              aria-label="Back to algorithm selection"
            >
              All Sorts
            </Link>
            <h1 className="text-xl font-bold">{algorithm.name}</h1>
          </div>
        </nav>

        <div className="relative flex flex-col h-[calc(100vh-4rem)] p-4">
          {/* Controls */}
          <div
            className="flex flex-wrap items-center gap-6 mb-6"
            role="toolbar"
            aria-label="Sorting controls"
          >
            <button
              ref={randomizeButtonRef}
              onClick={handleRandomize}
              disabled={isRunning}
              className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Randomize array"
            >
              Randomize Array
            </button>

            <button
              ref={sortButtonRef}
              onClick={handleSort}
              disabled={isSorting && !isRunning}
              className={`px-4 py-2 border transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                ${isRunning
                  ? "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600"
                  : "border-white text-white hover:bg-white hover:text-black"
                }`}
              aria-label={isRunning ? "Stop sorting" : "Start sorting"}
            >
              {isRunning ? "Stop Sorting" : "Start Sorting"}
            </button>

            <div className="flex items-center gap-4">
              <label htmlFor="speed-select" className="text-sm">
                Speed:
              </label>
              <select
                id="speed-select"
                value={delay}
                onChange={handleSpeedChange}
                disabled={isRunning}
                className="bg-black border border-gray-800 text-white px-2 py-1 rounded focus:outline-none focus:border-gray-600"
                aria-label="Sorting speed"
              >
                <option value="100">Slow</option>
                <option value="50">Normal</option>
                <option value="25">Fast</option>
                <option value="10">Very Fast</option>
                <option value="5">Ultra Fast</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="array-size" className="text-sm">
                Array Size:
              </label>
              <input
                id="array-size"
                type="text"
                value={arraySize}
                onChange={handleSizeChange}
                disabled={isSorting}
                className="w-20 px-2 py-1 bg-transparent border border-gray-800 text-white disabled:opacity-50"
                placeholder="50"
                aria-label="Array size"
                aria-description={
                  algorithm.requiresPowerOf2
                    ? "Must be a power of 2"
                    : "Enter size between 5 and 200"
                }
              />
            </div>

            <div className="flex items-center gap-4" aria-live="polite">
              <span className="text-sm">Time:</span>
              <span className="font-mono text-gray-400">
                {timeTaken.toFixed(2)}ms
              </span>
            </div>
          </div>

          <div
            className="flex-1 border border-gray-800 rounded flex items-end justify-end gap-[2px] p-4 bg-zinc-900/75"
            role="region"
            aria-label="Array visualization"
          >
            {array.map((bar: ArrayBar, index: number) => (
              <div
                key={index}
                className={`w-1 transition-all duration-200 ${bar.isComparing
                    ? "bg-yellow-500"
                    : bar.isSorted
                      ? "bg-green-500"
                      : "bg-white"
                  }`}
                style={{ height: `${bar.height}px` }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section
        className="min-h-screen bg-gradient-to-b from-zinc-900 to-black px-4 py-16"
        aria-label="Algorithm information"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Algorithm Description */}
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center space-x-4 mb-6">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    How it Works
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
                </div>
                <p className="text-gray-400 leading-relaxed text-lg transition-colors duration-300 group-hover:text-gray-300">
                  {algorithm.description}
                </p>
              </div>

              <div className="group">
                <div className="flex items-center space-x-4 mb-6">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Step by Step
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
                </div>
                <ol className="relative border-l border-gray-800 space-y-6 ml-4">
                  {algorithm.stepDescription.map((step, index) => (
                    <li key={index} className="ml-6 group/item">
                      <span className="absolute flex items-center justify-center w-6 h-6 bg-zinc-900 rounded-full -left-3 border border-gray-800 group-hover/item:border-gray-700 transition-colors">
                        {index + 1}
                      </span>
                      <p className="text-gray-400 group-hover/item:text-gray-300 transition-colors">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Complexity Information */}
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center space-x-4 mb-8">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Complexity Analysis
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
                </div>

                <div className="space-y-8">
                  <div className="bg-zinc-900/50 border border-gray-800 rounded-lg p-6 group-hover:border-gray-700 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Time Complexity
                    </h3>
                    <ul className="space-y-4">
                      {[
                        {
                          label: "Best Case",
                          value: algorithm.timeComplexity.best,
                        },
                        {
                          label: "Average Case",
                          value: algorithm.timeComplexity.average,
                        },
                        {
                          label: "Worst Case",
                          value: algorithm.timeComplexity.worst,
                        },
                      ].map(({ label, value }) => (
                        <li
                          key={label}
                          className="flex justify-between items-center pb-3 border-b border-gray-800/50 last:border-0 last:pb-0"
                        >
                          <span className="text-gray-400">{label}</span>
                          <code className="font-mono text-white bg-black/25 px-3 py-1 rounded">
                            {value}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-zinc-900/50 border border-gray-800 rounded-lg p-6 group-hover:border-gray-700 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Space Complexity
                    </h3>
                    <code className="font-mono text-white bg-black/25 px-3 py-1 rounded">
                      {algorithm.spaceComplexity}
                    </code>
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
