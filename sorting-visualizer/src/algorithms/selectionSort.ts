// src/algorithms/selectionSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const selectionSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    array[i].isComparing = true;
    updateArray([...array]);

    for (let j = i + 1; j < n; j++) {
      array[j].isComparing = true;
      updateArray([...array]);
      await delay(); // Use the provided delay function

      if (array[j].height < array[minIdx].height) {
        if (minIdx !== i) {
          array[minIdx].isComparing = false;
        }
        minIdx = j;
      } else {
        if (j !== minIdx) {
          array[j].isComparing = false;
        }
      }
      updateArray([...array]);
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
    }

    array[i].isSorted = true;
    array[i].isComparing = false;
    if (minIdx !== i) {
      array[minIdx].isComparing = false;
    }
    updateArray([...array]);
  }

  array[n - 1].isSorted = true;
  updateArray([...array]);
};

export const selectionSort: SortingAlgorithm = {
  name: "Selection Sort",
  execute: createSortingAlgorithm(selectionSortLogic),
  description: "Selection Sort works by repeatedly finding the minimum element...",
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