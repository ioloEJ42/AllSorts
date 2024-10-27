import React, { useState, useEffect } from "react";
import { ArrayBar } from "../types";

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);

  const generateRandomArray = (length: number = 50) => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < length; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 500) + 10,
        isComparing: false,
        isSorted: false,
      });
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center gap-1 h-[400px] items-end">
        {array.map((bar, index) => (
          <div
            key={index}
            className={`w-2 transition-all duration-150 ${
              bar.isComparing
                ? "bg-red-500"
                : bar.isSorted
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            style={{ height: `${bar.value}px` }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => generateRandomArray()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate New Array
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
