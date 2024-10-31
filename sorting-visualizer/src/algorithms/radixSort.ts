// src/algorithms/radixSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const radixSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const getMax = (arr: ArrayBar[]): number => {
    let max = 0;
    for (const bar of arr) {  // Changed to const
      const numLength = bar.height.toString().length;
      if (max < numLength) {
        max = numLength;
      }
    }
    return max;
  };

  const getPosition = (num: number, place: number): number => {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  };

  const maxDigits = getMax(array);

  for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
    const buckets: ArrayBar[][] = Array.from({ length: 10 }, () => []);  // Changed to const

    for (let i = 0; i < array.length; i++) {
      array[i].isComparing = true;
      updateArray([...array]);
      await delay();

      const digit = getPosition(array[i].height, digitPlace);
      buckets[digit].push(array[i]);

      array[i].isComparing = false;
      updateArray([...array]);
      await delay();
    }

    let index = 0;
    for (let bucket = 0; bucket < 10; bucket++) {
      for (const item of buckets[bucket]) {  // Changed to const
        array[index].isComparing = true;
        updateArray([...array]);
        await delay();

        array[index] = item;
       
        if (digitPlace === maxDigits - 1) {
          array[index].isSorted = true;
        }

        array[index].isComparing = false;
        updateArray([...array]);
        await delay();
        index++;
      }
    }

    if (digitPlace < maxDigits - 1) {
      for (let i = 0; i < array.length; i++) {
        array[i].isComparing = true;
        updateArray([...array]);
        await delay();
        array[i].isComparing = false;
        updateArray([...array]);
      }
    }
  }

  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const radixSort: SortingAlgorithm = {
  name: "Radix Sort",
  execute: createSortingAlgorithm(radixSortLogic),
  description: "Radix Sort is a non-comparative sorting algorithm that sorts numbers by processing each digit position, starting from the least significant digit (LSD) to the most significant digit (MSD). It uses counting sort as a subroutine to sort elements based on their digits.",
  timeComplexity: {
    best: "O(d × (n + b))",
    average: "O(d × (n + b))",
    worst: "O(d × (n + b))"
  },
  spaceComplexity: "O(n + 2^d)",
  stepDescription: [
    "Find the maximum number to know number of digits",
    "For each digit position (starting from least significant)",
    "Create 10 buckets (0-9) for each possible digit",
    "Distribute numbers into buckets based on current digit",
    "Collect numbers from buckets back into array"
  ],
  category: 'odd'
};