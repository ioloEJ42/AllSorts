// src/algorithms/registry.ts
import { bubbleSort } from './bubblesort';
import { selectionSort } from './selectionSort';
import { quickSort } from './quickSort';
import { SortingAlgorithm } from '../types/sortingTypes';
import { mergeSort } from './mergeSort';
import { heapSort } from './heapSort';
import { insertionSort } from './insertionSort';

interface AlgorithmRegistryItem {
  component: SortingAlgorithm;
  path: string;
  title: string;
  description: string;
}

interface AlgorithmRegistry {
  [key: string]: AlgorithmRegistryItem;
}

export const algorithmRegistry: AlgorithmRegistry = {
  bubbleSort: {
    component: bubbleSort,
    path: 'bubble-sort',
    title: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
  },
  selectionSort: {
    component: selectionSort,
    path: 'selection-sort',
    title: 'Selection Sort',
    description: 'Works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning of the sorted portion.'
  },
  quickSort: {
    component: quickSort,
    path: 'quick-sort',
    title: 'Quick Sort',
    description: 'A highly efficient sorting algorithm that uses a divide-and-conquer strategy with a pivot element to partition and sort the array.'
  },
  mergeSort: {
    component: mergeSort,
    path: 'merge-sort',
    title: 'Merge Sort',
    description: 'A stable, divide-and-conquer sorting algorithm that consistently performs in O(n log n) time by recursively dividing, sorting, and merging subarrays.'
  },
  heapSort: {
    component: heapSort,
    path: 'heap-sort',
    title: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to create a sorted array by repeatedly extracting the maximum element.'
  },
  insertionSort: {
    component: insertionSort,
    path: 'insertion-sort',
    title: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.'
  }
};