// src/algorithms/bitonicSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';
import toast from 'react-hot-toast';

export const isPowerOf2 = (n: number): boolean => {
  return !!(n && (n & (n - 1)) === 0);
};
  
const bitonicSortLogic = async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    delay: () => Promise<void>
  ) => {
    const n = array.length;
    
    if (!isPowerOf2(n)) {
      toast.error('Array size must be a power of 2 for Bitonic Sort');
      return;
    }
 // Helper function to delay and update visualization
 const updateWithDelay = async (i: number, l: number, isComparing: boolean = true) => {
   if (isComparing) {
     array[i].isComparing = true;
     array[l].isComparing = true;
   } else {
     array[i].isComparing = false;
     array[l].isComparing = false;
   }
   updateArray([...array]);
   await delay();
 };

 // Main sorting logic
 for (let k = 2; k <= n; k *= 2) {
   for (let j = k/2; j > 0; j /= 2) {
     for (let i = 0; i < n; i++) {
       const l = i ^ j;
       
       if (l > i) {
         // Show comparison
         await updateWithDelay(i, l);

         const ascending = (i & k) === 0;
         if ((ascending && array[i].height > array[l].height) ||
             (!ascending && array[i].height < array[l].height)) {
           // Perform swap
           [array[i], array[l]] = [array[l], array[i]];
           await updateWithDelay(i, l);
         }

         // Reset comparison highlighting
         await updateWithDelay(i, l, false);
       }

       // Mark elements as sorted when they reach their final position
       if (k === n && j === 1) {
         let correctPosition = true;
         
         // Check if element is in its final position
         for (let m = 0; m < i; m++) {
           if (array[m].height > array[i].height) {
             correctPosition = false;
             break;
           }
         }
         for (let m = i + 1; m < n; m++) {
           if (array[m].height < array[i].height) {
             correctPosition = false;
             break;
           }
         }
         
         if (correctPosition) {
           array[i].isSorted = true;
         }
       }
     }
   }
 }

 // Final cleanup - mark all elements as sorted
 array.forEach(bar => {
   bar.isSorted = true;
   bar.isComparing = false;
 });
 updateArray([...array]);
};

export const bitonicSort: SortingAlgorithm = {
    name: "Bitonic Sort",
    execute: createSortingAlgorithm(bitonicSortLogic),
    description: "Bitonic Sort is a parallel sorting algorithm that works by first constructing a bitonic sequence (two monotonic sequences) and then converting it into a monotonically increasing sequence. It requires the input size to be a power of 2.",
    timeComplexity: {
      best: "O(log² n)",
      average: "O(log² n)",
      worst: "O(log² n)"
    },
    spaceComplexity: "O(n log² n)",
    stepDescription: [
      "Convert input into a bitonic sequence",
      "Compare and swap elements based on bitonic patterns",
      "Recursively sort ascending and descending subsequences",
      "Merge subsequences to create final sorted sequence",
      "Only works with arrays of size 2^n"
    ],
    category: 'odd',
    requiresPowerOf2: true
  };