// src/algorithms/shakerSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const shakerSortLogic = async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    delay: () => Promise<void>
  ) => {
    const n = array.length;
    let isSorted = true;  // Start as true to enter the loop
  
    const updateAndDelay = async () => {
      updateArray([...array]);
      await delay();
    };
  
    while (isSorted) {
      isSorted = false;  // Reset at the start of the forward pass
      
      // Forward pass
      for (let i = 0; i < n - 1; i++) {
        // Set comparing state
        array[i].isComparing = true;
        array[i + 1].isComparing = true;
        await updateAndDelay();
  
        if (array[i].height > array[i + 1].height) {
          // Swap elements
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          isSorted = true;  // Set to true if we make any swaps
          await updateAndDelay();
        }
  
        // Reset comparing state
        array[i].isComparing = false;
        array[i + 1].isComparing = false;
        await updateAndDelay();
      }
  
      // If no swaps were made, array is sorted
      if (!isSorted) {
        break;
      }
  
      isSorted = false;  // Reset for backward pass
  
      // Backward pass
      for (let i = n - 1; i > 0; i--) {
        // Set comparing state
        array[i - 1].isComparing = true;
        array[i].isComparing = true;
        await updateAndDelay();
  
        if (array[i - 1].height > array[i].height) {
          // Swap elements
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
          isSorted = true;  // Set to true if we make any swaps
          await updateAndDelay();
        }
  
        // Reset comparing state
        array[i - 1].isComparing = false;
        array[i].isComparing = false;
        await updateAndDelay();
      }
  
      // Mark elements as sorted progressively
      if (!isSorted) {
        // If no swaps were made in either pass, mark all as sorted
        array.forEach((bar) => {
          bar.isSorted = true;
        });
      }
    }
  
    // Final cleanup - mark all as sorted
    array.forEach(bar => {
      bar.isSorted = true;
      bar.isComparing = false;
    });
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
  ],
  category: 'quadratic'
};