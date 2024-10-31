// src/algorithms/combSort.ts
import { ArrayBar, SortingAlgorithm } from '../types/sortingTypes';
import { createSortingAlgorithm } from '../utils/sortingWrapper';

const combSortLogic = async (
  array: ArrayBar[],
  updateArray: (newArray: ArrayBar[]) => void,
  delay: () => Promise<void>
) => {
  const n = array.length;
  const shrinkFactor = 1.3;
  let gap = n;
  let sorted = false;

  while (!sorted) {
    // Update gap using shrink factor
    gap = Math.floor(gap / shrinkFactor);
    if (gap <= 1) {
      gap = 1;
      sorted = true; // Will be set to false if any swaps occur
    }

    // Compare elements with current gap
    for (let i = 0; i < n - gap; i++) {
      const nextIndex = i + gap;

      // Clear previous comparison states
      array.forEach(bar => bar.isComparing = false);

      // Highlight elements being compared
      array[i].isComparing = true;
      array[nextIndex].isComparing = true;
      updateArray([...array]);
      await delay();

      if (array[i].height > array[nextIndex].height) {
        // Swap elements
        [array[i], array[nextIndex]] = [array[nextIndex], array[i]];
        sorted = false; // A swap occurred, so not sorted yet
        updateArray([...array]);
        await delay();
      }

      // Reset comparison highlighting
      array[i].isComparing = false;
      array[nextIndex].isComparing = false;

      // Mark elements as sorted if they're in their final position
      if (gap === 1) {
        let isFinal = true;
        
        // Check if element is in its final position
        for (let j = 0; j < i; j++) {
          if (array[j].height > array[i].height) {
            isFinal = false;
            break;
          }
        }
        for (let j = i + 1; j < n; j++) {
          if (array[j].height < array[i].height) {
            isFinal = false;
            break;
          }
        }
        
        if (isFinal) {
          array[i].isSorted = true;
        }
      }
    }

    // After each complete pass with gap=1, mark remaining sorted elements
    if (gap === 1 && sorted) {
      array.forEach(bar => {
        bar.isSorted = true;
      });
    }

    updateArray([...array]);
    await delay();
  }

  // Final cleanup
  array.forEach(bar => {
    bar.isSorted = true;
    bar.isComparing = false;
  });
  updateArray([...array]);
};

export const combSort: SortingAlgorithm = {
  name: "Comb Sort",
  execute: createSortingAlgorithm(combSortLogic),
  description: "Comb Sort improves upon Bubble Sort by using a gap larger than 1 to compare elements. The gap progressively shrinks by a factor of 1.3 until it becomes 1, effectively removing small values near the end (known as 'turtles') that slow down Bubble Sort.",
  timeComplexity: {
    best: "O(n log n)",
    average: "Ω(n²/2ᵖ)",
    worst: "O(n²)"
  },
  spaceComplexity: "O(1)",
  stepDescription: [
    "Start with gap as array length",
    "Reduce gap by dividing with shrink factor (1.3)",
    "Compare and swap elements that are gap positions apart",
    "Continue until gap becomes 1 and no swaps needed",
    "Effectively removes 'turtle' values that slow Bubble Sort"
  ],
  category: 'odd'
};