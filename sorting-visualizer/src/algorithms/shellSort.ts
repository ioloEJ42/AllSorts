// src/algorithms/shellSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const shellSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    // Clear any previous comparisons
    array.forEach(bar => bar.isComparing = false);
    updateArray([...array]);
    await delay();

    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      // Store current element
      const temp = array[i].height;
      
      // Highlight current element being placed
      array[i].isComparing = true;
      updateArray([...array]);
      await delay();

      let j;
      // Shift earlier gap-sorted elements up until correct location for array[i] is found
      for (j = i; j >= gap && array[j - gap].height > temp; j -= gap) {
        // Highlight elements being compared
        array[j - gap].isComparing = true;
        updateArray([...array]);
        await delay();

        // Move element up
        array[j].height = array[j - gap].height;
        updateArray([...array]);
        await delay();

        // Reset comparison highlighting
        array[j - gap].isComparing = false;
      }

      // Put temp in its correct location
      array[j].height = temp;
      array[j].isComparing = false;
      
      // Mark elements as sorted if they're in their final position
      let isSortedPosition = true;
      for (let k = 0; k < j; k++) {
        if (array[k].height > array[j].height) {
          isSortedPosition = false;
          break;
        }
      }
      for (let k = j + 1; k < n; k++) {
        if (array[k].height < array[j].height) {
          isSortedPosition = false;
          break;
        }
      }
      if (isSortedPosition) {
        array[j].isSorted = true;
      }

      updateArray([...array]);
      await delay();
    }

    // After each gap iteration, mark elements that are definitely sorted
    for (let i = 0; i < n - 1; i++) {
      if (array[i].height <= array[i + 1].height) {
        array[i].isSorted = true;
      }
    }
    array[n - 1].isSorted = true;
    updateArray([...array]);
    await delay();
  }

  // Final pass to mark all elements as sorted
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const shellSort: SortingAlgorithm = {
  name: "Shell Sort",
  execute: createSortingAlgorithm(shellSortLogic),
  description: "Shell Sort is an optimization of Insertion Sort that allows the exchange of items that are far apart. The algorithm progressively reduces the gap between elements being compared, improving performance over a simple insertion sort.",
  timeComplexity: {
    best: "O(n log n)",
    average: "O(n^1.25)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Start with a large gap size (n/2)",
    "Compare and swap elements that are gap positions apart",
    "Progressively reduce the gap size",
    "Continue until gap becomes 1 (regular insertion sort)",
    "Final pass ensures all elements are in order"
  ],
  category: 'odd' 
};