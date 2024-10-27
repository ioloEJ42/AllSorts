// src/algorithms/bubbleSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';

export const bubbleSort: SortingAlgorithm = {
  name: "Bubble Sort",
  execute: async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    setTimeTaken: (time: number) => void,
    delay: number = 50
  ) => {
    const startTime = performance.now();
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        // Highlight elements being compared
        arrayCopy[j].isComparing = true;
        arrayCopy[j + 1].isComparing = true;
        updateArray([...arrayCopy]);

        await new Promise(resolve => setTimeout(resolve, delay));

        // Compare and swap based on height (visual representation)
        if (arrayCopy[j].height > arrayCopy[j + 1].height) {
          // Swap elements
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;
          swapped = true;
          updateArray([...arrayCopy]);
        }

        // Reset comparison highlighting
        arrayCopy[j].isComparing = false;
        arrayCopy[j + 1].isComparing = false;

        // Mark the larger element as sorted if it's in its final position
        if (j === n - i - 2) {
          arrayCopy[j + 1].isSorted = true;
        }
        
        updateArray([...arrayCopy]);
      }

      if (!swapped) {
        // Mark all remaining elements as sorted
        for (let k = 0; k <= n - i - 1; k++) {
          arrayCopy[k].isSorted = true;
        }
        updateArray([...arrayCopy]);
        break;
      }
    }

    // Ensure all elements are marked as sorted
    arrayCopy.forEach(bar => {
      bar.isSorted = true;
      bar.isComparing = false;
    });
    updateArray([...arrayCopy]);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  },
  description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Compare adjacent elements",
    "Swap them if they are in wrong order",
    "Move to next pair of elements",
    "Repeat until no swaps are needed in a pass",
    "Each pass bubbles up the largest unsorted element"
  ]
};