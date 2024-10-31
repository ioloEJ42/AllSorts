export interface ArrayBar {
  height: number;
  value: number;
  isComparing: boolean;
  isSorted: boolean;
}

export type ComplexityCategory = 'logarithmic' | 'quadratic' | 'odd';

// src/types/sortingTypes.ts
export interface SortingAlgorithm {
  name: string;
  execute: (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    setTimeTaken: (time: number) => void,
    delay?: number,
    signal?: AbortSignal
  ) => Promise<void>;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stepDescription: string[];
  category: ComplexityCategory;
  requiresPowerOf2?: boolean;  // Add this line
}