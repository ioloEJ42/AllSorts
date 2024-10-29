// src/algorithms/brickSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const brickSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;

    // Odd phase (1, 3, 5, ...)
    for (let i = 1; i < n - 1; i += 2) {
      // Set comparing state for current pair
      array[i].isComparing = true;
      array[i + 1].isComparing = true;
      updateArray([...array]);
      await delay();

      if (array[i].height > array[i + 1].height) {
        // Swap elements
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        sorted = false;
        updateArray([...array]);
        await delay(); // Add delay after swap to make it visible
      }

      // Reset comparing state
      array[i].isComparing = false;
      array[i + 1].isComparing = false;
      updateArray([...array]);

      // Add delay between comparisons unless at the end
      if (i < n - 3) {
        await delay();
      }
    }

    // Even phase (0, 2, 4, ...)
    for (let i = 0; i < n - 1; i += 2) {
      // Set comparing state for current pair
      array[i].isComparing = true;
      array[i + 1].isComparing = true;
      updateArray([...array]);
      await delay();

      if (array[i].height > array[i + 1].height) {
        // Swap elements
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        sorted = false;
        updateArray([...array]);
        await delay(); // Add delay after swap to make it visible
      }

      // Reset comparing state
      array[i].isComparing = false;
      array[i + 1].isComparing = false;
      updateArray([...array]);

      // Add delay between comparisons unless at the end
      if (i < n - 3) {
        await delay();
      }
    }

    // If array is sorted, progressively mark elements as sorted
    if (sorted) {
      for (let i = 0; i < n; i++) {
        array[i].isSorted = true;
        array[i].isComparing = false; // Ensure no comparing states remain
        updateArray([...array]);
        await delay();
      }
    } else {
      // Only clear sorted states if we're still sorting
      array.forEach(bar => {
        bar.isSorted = false;
        bar.isComparing = false; // Ensure no comparing states remain
      });
      updateArray([...array]);
    }
  }

  // Final pass to ensure all elements are properly marked
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const brickSort: SortingAlgorithm = {
  name: "Brick Sort",
  execute: createSortingAlgorithm(brickSortLogic),
  description: "Brick Sort (also known as Odd-Even Sort) is a parallel sorting algorithm based on bubble sort. The algorithm repeatedly compares pairs of adjacent elements in odd-even and even-odd positions until the array is sorted.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Compare and sort odd-indexed pairs (1-2, 3-4, etc.)",
    "Compare and sort even-indexed pairs (0-1, 2-3, etc.)",
    "Repeat both phases until no swaps are needed",
    "Each phase sorts pairs independently",
    "Algorithm is naturally parallel in nature"
  ],
  category: 'quadratic'
};