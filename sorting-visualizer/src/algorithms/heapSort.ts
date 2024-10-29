// src/algorithms/heapSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const heapSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const heapify = async (size: number, rootIndex: number) => {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    // Highlight the current root and its children
    array[rootIndex].isComparing = true;
    if (leftChild < size) array[leftChild].isComparing = true;
    if (rightChild < size) array[rightChild].isComparing = true;
    updateArray([...array]);
    await delay();

    // Find the largest among root, left child and right child
    if (leftChild < size && array[leftChild].height > array[largest].height) {
      largest = leftChild;
    }

    if (rightChild < size && array[rightChild].height > array[largest].height) {
      largest = rightChild;
    }

    // If largest is not root
    if (largest !== rootIndex) {
      // Swap root with the largest
      [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]];
      updateArray([...array]);
      await delay();

      // Reset comparison highlighting
      array[rootIndex].isComparing = false;
      if (leftChild < size) array[leftChild].isComparing = false;
      if (rightChild < size) array[rightChild].isComparing = false;
      updateArray([...array]);

      // Recursively heapify the affected sub-tree
      await heapify(size, largest);
    } else {
      // Reset comparison highlighting if no swap was needed
      array[rootIndex].isComparing = false;
      if (leftChild < size) array[leftChild].isComparing = false;
      if (rightChild < size) array[rightChild].isComparing = false;
      updateArray([...array]);
    }
  };

  // Build max heap (rearrange array)
  const size = array.length;
  
  // Highlight the building of the initial heap
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    // Highlight current subtree root
    array[i].isComparing = true;
    updateArray([...array]);
    await delay();
    
    await heapify(size, i);
  }

  // Extract elements from heap one by one
  for (let i = size - 1; i > 0; i--) {
    // Highlight the root (max element)
    array[0].isComparing = true;
    array[i].isComparing = true;
    updateArray([...array]);
    await delay();

    // Move current root to end
    [array[0], array[i]] = [array[i], array[0]];
    array[i].isComparing = false;
    array[i].isSorted = true;  // Mark the positioned element as sorted
    updateArray([...array]);
    await delay();

    // Reset root highlighting
    array[0].isComparing = false;
    updateArray([...array]);

    // Call heapify on the reduced heap
    await heapify(i, 0);
  }

  // Mark the first element as sorted
  array[0].isSorted = true;
  updateArray([...array]);
};

export const heapSort: SortingAlgorithm = {
  name: "Heap Sort",
  execute: createSortingAlgorithm(heapSortLogic),
  description: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and inserting it into the sorted region.",
  timeComplexity: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Build a max heap from the input array",
    "Swap the root (maximum element) with the last element of the heap",
    "Reduce heap size by 1 and heapify the root",
    "Repeat steps 2-3 until size becomes 1",
    "The array is now sorted in ascending order"
  ]
};