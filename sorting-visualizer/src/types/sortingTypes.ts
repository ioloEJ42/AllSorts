export interface ArrayBar {
  height: number;
  value: number;
  isComparing: boolean;
  isSorted: boolean;
}

export interface SortingAlgorithm {
  name: string;
  execute: (
    array: ArrayBar[],
    updateArray: (newArray: ArrayBar[]) => void,
    setTimeTaken: (time: number) => void,
    delay?: number
  ) => Promise<void>;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stepDescription: string[];
}