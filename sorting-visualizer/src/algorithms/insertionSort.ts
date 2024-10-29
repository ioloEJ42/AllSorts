// src/algorithms/insertionSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const insertionSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;

  // First element is considered sorted
  array[0].isSorted = true;
  updateArray([...array]);
  await delay();

  for (let i = 1; i < n; i++) {
    // Highlight current element to be inserted
    const key = array[i].height;
    array[i].isComparing = true;
    updateArray([...array]);
    await delay();

    let j = i - 1;

    // Move elements of array[0..i-1] that are greater than key
    // to one position ahead of their current position
    while (j >= 0 && array[j].height > key) {
      // Highlight elements being compared
      array[j].isComparing = true;
      updateArray([...array]);
      await delay();

      // Shift element
      array[j + 1].height = array[j].height;
      
      // Show the shift
      updateArray([...array]);
      await delay();

      // Reset comparison highlight
      array[j].isComparing = false;
      
      j--;
    }

    // Place the key in its correct position
    array[j + 1].height = key;
    
    // Mark all elements up to i as sorted
    for (let k = 0; k <= i; k++) {
      array[k].isSorted = true;
      array[k].isComparing = false;
    }
    
    updateArray([...array]);
    await delay();
  }

  // Ensure all elements are marked as sorted
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const insertionSort: SortingAlgorithm = {
  name: "Insertion Sort",
  execute: createSortingAlgorithm(insertionSortLogic),
  description: "Insertion Sort is a simple sorting algorithm that iterates through an array and at each iteration, it removes one element from the input data, finds its correct position in the sorted portion, and inserts it there.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Start with the first element as the sorted portion",
    "Take the next element and store it as the key",
    "Compare key with elements in sorted portion from right to left",
    "Move greater elements one position ahead",
    "Insert key in its correct position in sorted portion"
  ]
};