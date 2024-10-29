// src/algorithms/mergeSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const mergeSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  // Helper function to create a deep copy of ArrayBar objects
  const copyArrayBar = (bar: ArrayBar): ArrayBar => ({
    ...bar,
    isComparing: false,
    isSorted: false
  });

  const merge = async (left: number, middle: number, right: number) => {
    const leftArray = array.slice(left, middle + 1).map(copyArrayBar);
    const rightArray = array.slice(middle + 1, right + 1).map(copyArrayBar);
    
    let i = left;
    let leftIndex = 0;
    let rightIndex = 0;

    // Highlight the subarrays being merged
    for (let k = left; k <= right; k++) {
      array[k].isComparing = true;
    }
    updateArray([...array]);
    await delay();

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      // Highlight elements being compared
      array[left + leftIndex].isComparing = true;
      array[middle + 1 + rightIndex].isComparing = true;
      updateArray([...array]);
      await delay();

      if (leftArray[leftIndex].height <= rightArray[rightIndex].height) {
        array[i] = copyArrayBar(leftArray[leftIndex]);
        leftIndex++;
      } else {
        array[i] = copyArrayBar(rightArray[rightIndex]);
        rightIndex++;
      }
      
      // Show the placement of the smaller element
      array[i].isComparing = true;
      updateArray([...array]);
      await delay();
      
      array[i].isComparing = false;
      i++;
    }

    // Copy remaining elements of leftArray
    while (leftIndex < leftArray.length) {
      array[i] = copyArrayBar(leftArray[leftIndex]);
      array[i].isComparing = true;
      updateArray([...array]);
      await delay();
      
      array[i].isComparing = false;
      leftIndex++;
      i++;
    }

    // Copy remaining elements of rightArray
    while (rightIndex < rightArray.length) {
      array[i] = copyArrayBar(rightArray[rightIndex]);
      array[i].isComparing = true;
      updateArray([...array]);
      await delay();
      
      array[i].isComparing = false;
      rightIndex++;
      i++;
    }

    // Mark this section as sorted
    for (let k = left; k <= right; k++) {
      array[k].isSorted = true;
      array[k].isComparing = false;
    }
    updateArray([...array]);
    await delay();
  };

  const mergeSortRecursive = async (left: number, right: number) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);

      // Highlight current subarray
      for (let i = left; i <= right; i++) {
        array[i].isComparing = true;
      }
      updateArray([...array]);
      await delay();

      // Reset highlighting
      for (let i = left; i <= right; i++) {
        array[i].isComparing = false;
      }
      updateArray([...array]);

      // Recursively sort the two halves
      await mergeSortRecursive(left, middle);
      await mergeSortRecursive(middle + 1, right);

      // Merge the sorted halves
      await merge(left, middle, right);
    } else if (left === right) {
      // Single element is already sorted
      array[left].isSorted = true;
      updateArray([...array]);
      await delay();
    }
  };

  // Start the merge sort
  await mergeSortRecursive(0, array.length - 1);

  // Ensure all elements are marked as sorted at the end
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const mergeSort: SortingAlgorithm = {
  name: "Merge Sort",
  execute: createSortingAlgorithm(mergeSortLogic),
  description: "Merge Sort is a divide-and-conquer algorithm that recursively splits the array into two halves, sorts them, and then merges the sorted halves to produce a final sorted array.",
  timeComplexity: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)"
  },
  spaceComplexity: "O(n)",
  stepDescription: [
    "Divide the array into two halves",
    "Recursively sort the left and right halves",
    "Merge the sorted halves by comparing elements",
    "Place smaller element in the merged array",
    "Continue until all elements are merged and sorted"
  ],
  category: 'logarithmic'
};