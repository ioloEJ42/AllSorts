// src/algorithms/gnomeSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const gnomeSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;

  const moveBack = async (i: number) => {
    while (i > 0 && array[i - 1].height > array[i].height) {
      // Highlight comparing elements
      array[i].isComparing = true;
      array[i - 1].isComparing = true;
      updateArray([...array]);
      await delay();

      // Swap elements
      [array[i], array[i - 1]] = [array[i - 1], array[i]];
      updateArray([...array]);
      await delay();

      // Reset comparison highlighting
      array[i].isComparing = false;
      array[i - 1].isComparing = false;

      i--;
    }

    // Mark current position as sorted
    for (let k = i; k < n; k++) {
      if (!array[k].isSorted) {
        array[k].isSorted = true;
        updateArray([...array]);
      }
    }
  };

  // Main sorting loop
  for (let i = 1; i < n; i++) {
    // Highlight current element
    array[i].isComparing = true;
    array[i - 1].isComparing = true;
    updateArray([...array]);
    await delay();

    if (array[i - 1].height > array[i].height) {
      await moveBack(i);
    } else {
      // Reset comparison highlighting
      array[i].isComparing = false;
      array[i - 1].isComparing = false;
      
      // Mark as sorted if we didn't need to move back
      array[i - 1].isSorted = true;
      if (i === n - 1) array[i].isSorted = true;
      updateArray([...array]);
    }
  }

  // Ensure all elements are marked as sorted
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const gnomeSort: SortingAlgorithm = {
  name: "Gnome Sort",
  execute: createSortingAlgorithm(gnomeSortLogic),
  description: "Gnome Sort (also called Stupid Sort) is a sorting algorithm which is similar to Insertion Sort, except that moving an element to its proper position is accomplished by a series of swaps, as in Bubble Sort. The algorithm always finds the first place where two adjacent elements are in the wrong order and swaps them.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Compare current element with previous element",
    "If they are in the wrong order, swap them",
    "Move back through the array, continuing to swap until elements are in correct order",
    "Move forward to next element and repeat",
    "Process continues until array is sorted"
  ],
  category: 'quadratic'
};