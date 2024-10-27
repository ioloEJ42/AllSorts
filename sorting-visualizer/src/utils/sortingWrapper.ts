// src/utils/sortingWrapper.ts
import { ArrayBar } from '../types/sortingTypes';

type SortFunction = (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delayFn: () => Promise<void>
) => Promise<void>;

export const createSortingAlgorithm = (sortFn: SortFunction) => {
  return async (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    setTimeTaken: (time: number) => void,
    delay: number = 50,
    signal?: AbortSignal
  ) => {
    const startTime = performance.now();
    const arrayCopy = [...array];

    try {
      // Create a wrapped update function that checks for abort
      const wrappedUpdate = (newArray: ArrayBar[]) => {
        if (signal?.aborted) {
          throw new DOMException("Sorting aborted", "AbortError");
        }
        updateArray(newArray);
      };

      // Create a wrapped delay function that's abortable
      const wrappedDelay = async () => {
        await new Promise<void>((resolve, reject) => {
          const timeoutId = setTimeout(resolve, delay);
          signal?.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new DOMException("Sorting aborted", "AbortError"));
          });
        });
      };

      // Execute the actual sorting algorithm with our wrapped functions
      await sortFn(arrayCopy, wrappedUpdate, wrappedDelay);

      const endTime = performance.now();
      setTimeTaken(endTime - startTime);
    } catch (error: unknown) {
      const err = error as Error;
      if (err.name === 'AbortError') {
        // Reset comparing states but keep current progress
        arrayCopy.forEach(bar => {
          bar.isComparing = false;
        });
        updateArray(arrayCopy);
        throw err;
      }
      throw err;
    }
  };
};