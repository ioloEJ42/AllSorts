// src/algorithms/pancakeSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const pancakeSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const flip = async (endIndex: number) => {
    let left = 0;
    let right = endIndex;
    
    while (left < right) {
      // Highlight elements being flipped
      array[left].isComparing = true;
      array[right].isComparing = true;
      updateArray([...array]);
      await delay();

      // Perform the swap
      [array[left], array[right]] = [array[right], array[left]];
      
      // Show the swap
      updateArray([...array]);
      await delay();

      // Reset comparison state
      array[left].isComparing = false;
      array[right].isComparing = false;

      left++;
      right--;
    }
  };

  const findMaxIndex = async (end: number) => {
    let maxIndex = 0;
    
    // Find the maximum element's index
    for (let i = 0; i <= end; i++) {
      // Highlight current element being compared
      array[i].isComparing = true;
      updateArray([...array]);
      await delay();

      if (array[i].height > array[maxIndex].height) {
        // Reset previous max highlight
        array[maxIndex].isComparing = false;
        maxIndex = i;
      } else {
        // Reset current element highlight if not max
        array[i].isComparing = false;
      }
      updateArray([...array]);
    }

    // Reset all comparison states
    array.forEach(bar => bar.isComparing = false);
    updateArray([...array]);
    
    return maxIndex;
  };

  let n = array.length;

  while (n > 1) {
    // Find the maximum element in the unsorted portion
    const maxIndex = await findMaxIndex(n - 1);

    if (maxIndex !== n - 1) {
      // If max element is not at the end:
      // 1. Flip from start to maxIndex to bring max to front
      if (maxIndex !== 0) {
        await flip(maxIndex);
      }
      
      // 2. Flip from start to n-1 to bring max to correct position
      await flip(n - 1);
    }

    // Mark the last element as sorted
    array[n - 1].isSorted = true;
    updateArray([...array]);
    await delay();

    n--;
  }

  // Mark first element as sorted and final cleanup
  array[0].isSorted = true;
  array.forEach(bar => {
    bar.isComparing = false;
    bar.isSorted = true;
  });
  updateArray([...array]);
};

export const pancakeSort: SortingAlgorithm = {
  name: "Pancake Sort",
  execute: createSortingAlgorithm(pancakeSortLogic),
  description: "Pancake Sort works by repeatedly finding the maximum element in the unsorted portion and bringing it to its correct position through a series of 'flips'. Each flip reverses a portion of the array, similar to flipping a stack of pancakes.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Find the largest unsorted element",
    "Flip the subarray from start to that element (bringing it to front)",
    "Flip the subarray from start to its correct position (placing it at end)",
    "Mark as sorted and reduce the unsorted portion",
    "Repeat until all elements are in place"
  ],
  category: 'quadratic'
};