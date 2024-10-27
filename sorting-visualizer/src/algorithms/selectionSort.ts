// src/algorithms/selectionSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';

export const selectionSort: SortingAlgorithm = {
  name: "Selection Sort",
  execute: async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    setTimeTaken: (time: number) => void,
    delay: number = 50
  ) => {
    const startTime = performance.now();
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      
      // Mark current position as being compared
      arrayCopy[i].isComparing = true;
      updateArray([...arrayCopy]);
      
      // Find the minimum element in the unsorted portion
      for (let j = i + 1; j < n; j++) {
        // Highlight current comparison
        arrayCopy[j].isComparing = true;
        updateArray([...arrayCopy]);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (arrayCopy[j].height < arrayCopy[minIdx].height) {
          // Reset previous minimum's comparison state
          if (minIdx !== i) {
            arrayCopy[minIdx].isComparing = false;
          }
          minIdx = j;
        } else {
          // Reset current comparison if it's not the new minimum
          if (j !== minIdx) {
            arrayCopy[j].isComparing = false;
          }
        }
        updateArray([...arrayCopy]);
      }

      // Swap the found minimum with the first element of unsorted portion
      if (minIdx !== i) {
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[minIdx];
        arrayCopy[minIdx] = temp;
      }

      // Mark current position as sorted and reset comparison states
      arrayCopy[i].isSorted = true;
      arrayCopy[i].isComparing = false;
      if (minIdx !== i) {
        arrayCopy[minIdx].isComparing = false;
      }
      
      updateArray([...arrayCopy]);
    }

    // Mark the last element as sorted
    arrayCopy[n - 1].isSorted = true;
    updateArray([...arrayCopy]);

    const endTime = performance.now();
    setTimeTaken(endTime - startTime);
  },
  description: "Selection Sort works by repeatedly finding the minimum element from the unsorted portion of the array and placing it at the beginning of the sorted portion.",
  timeComplexity: {
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Find minimum element in unsorted array",
    "Swap it with first unsorted element",
    "Move boundary of sorted portion one element right",
    "Repeat until array is sorted",
    "Unlike Bubble Sort, it makes fewer swaps but same number of comparisons"
  ]
};