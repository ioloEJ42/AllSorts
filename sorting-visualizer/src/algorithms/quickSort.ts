// src/algorithms/quickSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const quickSortLogic = async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    delay: () => Promise<void>
  ) => {
    const quickSort = async (low: number, high: number) => {
      if (low < high) {
        // Highlight the current subarray we're working on
        for (let i = low; i <= high; i++) {
          array[i].isComparing = true;
        }
        updateArray([...array]);
        await delay();
  
        // Reset comparison highlighting
        for (let i = low; i <= high; i++) {
          array[i].isComparing = false;
        }
        updateArray([...array]);
  
        // Get pivot and partition array
        const pivotIndex = await partition(low, high);
        
        // Mark pivot as sorted and update
        array[pivotIndex].isSorted = true;
        updateArray([...array]);
        await delay();
  
        // Recursively sort left and right subarrays
        await quickSort(low, pivotIndex - 1);
        await quickSort(pivotIndex + 1, high);
      } else if (low === high) {
        // Single element is sorted
        array[low].isSorted = true;
        updateArray([...array]);
        await delay();
      }
    };
  
    const partition = async (low: number, high: number): Promise<number> => {
      // Choose rightmost element as pivot
      const pivot = array[high].height;
      
      // Highlight pivot
      array[high].isComparing = true;
      updateArray([...array]);
      await delay();
  
      let i = low - 1; // Index of smaller element
  
      // Partition the array around pivot
      for (let j = low; j < high; j++) {
        // Highlight current element being compared
        array[j].isComparing = true;
        updateArray([...array]);
        await delay();
  
        if (array[j].height < pivot) {
          i++;
          // Swap if needed
          if (i !== j) {
            // Highlight both elements being swapped
            array[i].isComparing = true;
            updateArray([...array]);
            await delay();
  
            // Perform swap
            [array[i], array[j]] = [array[j], array[i]];
            updateArray([...array]);
            await delay();
  
            // Reset highlighting for swapped elements
            array[i].isComparing = false;
          }
        }
  
        // Reset current element highlighting
        array[j].isComparing = false;
        updateArray([...array]);
      }
  
      // Place pivot in its correct position
      const pivotFinalPos = i + 1;
      if (pivotFinalPos !== high) {
        // Highlight final pivot position
        array[pivotFinalPos].isComparing = true;
        updateArray([...array]);
        await delay();
  
        // Swap pivot to its final position
        [array[pivotFinalPos], array[high]] = [array[high], array[pivotFinalPos]];
        updateArray([...array]);
        await delay();
      }
  
      // Clear all comparison states
      array[high].isComparing = false;
      array[pivotFinalPos].isComparing = false;
      updateArray([...array]);
  
      return pivotFinalPos;
    };
  
    // Start QuickSort
    await quickSort(0, array.length - 1);
  
    // Mark all elements as sorted at the end
    array.forEach(bar => {
      bar.isSorted = true;
      bar.isComparing = false;
    });
    updateArray([...array]);
  };

export const quickSort: SortingAlgorithm = {
  name: "Quick Sort",
  execute: createSortingAlgorithm(quickSortLogic),
  description: "Quick Sort is a highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy. It works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.",
  timeComplexity: {
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(log n)",
  stepDescription: [
    "Choose a pivot element from the array",
    "Partition other elements into two sub-arrays according to whether they are less than or greater than the pivot",
    "Recursively apply the above steps to the sub-arrays",
    "The pivot element is always in its final sorted position",
    "Continue until all elements are sorted"
  ]
};