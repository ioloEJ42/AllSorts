// src/algorithms/bubbleSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const bubbleSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      array[j].isComparing = true;
      array[j + 1].isComparing = true;
      updateArray([...array]);

      await delay();

      if (array[j].height > array[j + 1].height) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
      }

      array[j].isComparing = false;
      array[j + 1].isComparing = false;
      updateArray([...array]);
    }

    array[n - 1 - i].isSorted = true;

    // If no swapping occurred, array is sorted
    if (!swapped) {
      // Mark remaining elements as sorted
      for (let k = 0; k < n - i - 1; k++) {
        array[k].isSorted = true;
      }
      break;
    }
  }

  // Ensure first element is marked as sorted
  array[0].isSorted = true;
  updateArray([...array]);
};

export const bubbleSort: SortingAlgorithm = {
  name: "Bubble Sort",
  execute: createSortingAlgorithm(bubbleSortLogic),
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