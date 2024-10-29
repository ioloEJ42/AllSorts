// src/algorithms/bogoSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const bogoSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const isSorted = (arr: ArrayBar[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1].height > arr[i].height) {
        return false;
      }
    }
    return true;
  };

  const shuffle = async (arr: ArrayBar[]) => {
    let count = arr.length;
    
    while (count > 0) {
      const index = Math.floor(Math.random() * count);
      count--;

      // Highlight the elements being swapped
      arr[count].isComparing = true;
      arr[index].isComparing = true;
      updateArray([...arr]);
      await delay();

      // Perform the swap
      [arr[count], arr[index]] = [arr[index], arr[count]];
      updateArray([...arr]);
      await delay();

      // Reset the highlighting
      arr[count].isComparing = false;
      arr[index].isComparing = false;
    }
    return arr;
  };

  let sorted = false;
  let attempts = 0;
  const maxAttempts = 1000; // Safety limit

  while (!sorted && attempts < maxAttempts) {
    // Reset all sorted states before shuffle
    array.forEach(bar => {
      bar.isSorted = false;
      bar.isComparing = false;
    });
    updateArray([...array]);
    await delay();

    // Shuffle the array
    await shuffle(array);

    // Check if sorted
    sorted = isSorted(array);
    attempts++;

    // If sorted, mark all elements
    if (sorted) {
      for (let i = 0; i < array.length; i++) {
        array[i].isSorted = true;
        updateArray([...array]);
        await delay();
      }
    }
  }

  // Final cleanup
  array.forEach(bar => {
    bar.isSorted = sorted;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const bogoSort: SortingAlgorithm = {
  name: "Bogo Sort",
  execute: createSortingAlgorithm(bogoSortLogic),
  description: "Bogo Sort (also known as Stupid Sort) is a highly inefficient sorting algorithm based on randomly shuffling elements until they happen to be sorted. It's a probabilistic algorithm with an average complexity of O(n × n!).",
  timeComplexity: {
    best: "O(n)",
    average: "O(n × n!)",
    worst: "∞"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Randomly shuffle all elements in the array",
    "Check if the array is sorted",
    "If not sorted, repeat the process",
    "Continue until array is sorted or maximum attempts reached",
    "Not recommended for actual use due to extremely poor performance"
  ],
  category: 'odd'
};