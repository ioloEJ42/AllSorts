// src/algorithms/bubbleSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';

interface ErrorWithName extends Error {
  name: string;
}

export const bubbleSort: SortingAlgorithm = {
  name: "Bubble Sort",
  execute: async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    setTimeTaken: (time: number) => void,
    delay: number = 50,
    signal?: AbortSignal
  ) => {
    const startTime = performance.now();
    const arrayCopy = [...array];
    try {
      for (let i = 0; i < arrayCopy.length - 1; i++) {
        if (signal?.aborted) {
          throw new DOMException("Sorting aborted", "AbortError");
        }

        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
          if (signal?.aborted) {
            throw new DOMException("Sorting aborted", "AbortError");
          }

          arrayCopy[j].isComparing = true;
          arrayCopy[j + 1].isComparing = true;
          updateArray([...arrayCopy]);

          await new Promise<void>((resolve, reject) => {
            const timeoutId = setTimeout(resolve, delay);
            signal?.addEventListener('abort', () => {
              clearTimeout(timeoutId);
              reject(new DOMException("Sorting aborted", "AbortError"));
            });
          });

          if (arrayCopy[j].height > arrayCopy[j + 1].height) {
            [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          }

          arrayCopy[j].isComparing = false;
          arrayCopy[j + 1].isComparing = false;
          updateArray([...arrayCopy]);
        }
        
        arrayCopy[arrayCopy.length - 1 - i].isSorted = true;
      }

      arrayCopy[0].isSorted = true;
      updateArray([...arrayCopy]);
      
      const endTime = performance.now();
      setTimeTaken(endTime - startTime);
    } catch (error: unknown) {
      const err = error as ErrorWithName;
      if (err.name === 'AbortError') {
        arrayCopy.forEach(bar => {
          bar.isComparing = false;
        });
        updateArray([...arrayCopy]);
        throw err;
      }
      throw err;
    }
  },
  description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  timeComplexity: {
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Compare adjacent elements",
    "Swap them if they are in wrong order",
    "Move to next pair of elements",
    "Repeat until no swaps are needed in a pass",
    "Each pass bubbles up the largest unsorted element"
  ]
};