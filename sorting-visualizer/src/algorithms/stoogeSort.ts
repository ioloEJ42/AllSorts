// src/algorithms/stoogeSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const stoogeSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const stoogeSort = async (start: number, end: number) => {
    // Base case
    if (start >= end) return;

    // Highlight elements being compared
    array[start].isComparing = true;
    array[end].isComparing = true;
    updateArray([...array]);
    await delay();

    // If first element is larger than last, swap them
    if (array[start].height > array[end].height) {
      [array[start], array[end]] = [array[end], array[start]];
      updateArray([...array]);
      await delay();
    }

    // Reset comparison highlighting
    array[start].isComparing = false;
    array[end].isComparing = false;
    updateArray([...array]);

    // If there are at least 3 elements
    if ((end - start + 1) > 2) {
      const third = Math.floor((end - start + 1) / 3);

      // Recursively sort first 2/3
      await stoogeSort(start, end - third);
      
      // Recursively sort last 2/3
      await stoogeSort(start + third, end);
      
      // Recursively sort first 2/3 again
      await stoogeSort(start, end - third);
    }

    // Mark elements as sorted if they're in their final position
    if (start === 0 || end === array.length - 1) {
      for (let i = start; i <= end; i++) {
        let isFinal = true;
        // Check if element is in its final position
        for (let j = 0; j < array.length; j++) {
          if (i !== j && 
              ((j < i && array[j].height > array[i].height) ||
               (j > i && array[j].height < array[i].height))) {
            isFinal = false;
            break;
          }
        }
        if (isFinal) {
          array[i].isSorted = true;
        }
      }
      updateArray([...array]);
    }
  };

  // Start the sorting process
  await stoogeSort(0, array.length - 1);

  // Final cleanup - mark all as sorted
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const stoogeSort: SortingAlgorithm = {
  name: "Stooge Sort",
  execute: createSortingAlgorithm(stoogeSortLogic),
  description: "Stooge Sort is a recursive sorting algorithm that sorts elements by dividing the array into thirds and recursively sorting the first 2/3, last 2/3, and first 2/3 again. Known for its terrible time complexity of O(n^2.7095), it's primarily of theoretical interest.",
  timeComplexity: {
    best: "O(n^2.7095)",
    average: "O(n^2.7095)",
    worst: "O(n^2.7095)"
  },
  spaceComplexity: "O(n)",
  stepDescription: [
    "Compare first and last elements, swap if needed",
    "If more than 2 elements remain, divide into thirds",
    "Recursively sort first 2/3 of elements",
    "Recursively sort last 2/3 of elements",
    "Recursively sort first 2/3 again to ensure ordering"
  ],
  category: 'odd'
};