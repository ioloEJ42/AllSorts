// src/algorithms/shakerSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const shakerSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;
  let isSorted = true;
  let start = 0;
  let end = n - 1;

  while (isSorted) {
    isSorted = false;

    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      // Highlight comparing elements
      array[i].isComparing = true;
      array[i + 1].isComparing = true;
      updateArray([...array]);
      await delay();

      if (array[i].height > array[i + 1].height) {
        // Swap elements
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        isSorted = true;
        updateArray([...array]);
        await delay();
      }

      // Reset comparison highlighting
      array[i].isComparing = false;
      array[i + 1].isComparing = false;
    }

    // Mark the last element as sorted
    array[end].isSorted = true;
    updateArray([...array]);

    if (!isSorted) break;

    isSorted = false;
    end--;

    // Backward pass (right to left)
    for (let i = end - 1; i >= start; i--) {
      // Highlight comparing elements
      array[i].isComparing = true;
      array[i + 1].isComparing = true;
      updateArray([...array]);
      await delay();

      if (array[i].height > array[i + 1].height) {
        // Swap elements
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        isSorted = true;
        updateArray([...array]);
        await delay();
      }

      // Reset comparison highlighting
      array[i].isComparing = false;
      array[i + 1].isComparing = false;
    }

    // Mark the first element as sorted
    array[start].isSorted = true;
    updateArray([...array]);
    
    start++;
  }

  // Mark any remaining elements as sorted
  for (let i = 0; i < n; i++) {
    array[i].isSorted = true;
    array[i].isComparing = false;
  }
  updateArray([...array]);
};

export const shakerSort: SortingAlgorithm = {
  name: "Cocktail Shaker Sort",
  execute: createSortingAlgorithm(shakerSortLogic),
  description: "Cocktail Shaker Sort is a variation of Bubble Sort that sorts in both directions on each pass through the list. While it typically performs better than Bubble Sort, it still has O(n²) complexity.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Traverse the array from left to right, swapping adjacent elements if needed",
    "After reaching the end, traverse back from right to left",
    "Each pass reduces the range of elements to check",
    "Mark elements as sorted at both ends after each complete pass",
    "Continue until no more swaps are needed"
  ]
};