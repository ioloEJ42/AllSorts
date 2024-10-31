// src/algorithms/registry.ts

import { SortingAlgorithm } from '../types/sortingTypes';
// Logarithmic Sorts
import { quickSort } from './quickSort';
import { mergeSort } from './mergeSort';
import { heapSort } from './heapSort';

// Quadratic Sorts
import { bubbleSort } from './bubblesort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { gnomeSort } from './gnomeSort';
import { shakerSort } from './shakerSort';
import { brickSort } from './brickSort';
import { pancakeSort } from './pancakeSort';

// Weird Sorts
import { bitonicSort } from './bitonicSort';
import { shellSort } from './shellSort';
import { combSort } from './combSort';
import { bogoSort } from './bogoSort';
import { stoogeSort } from './stoogeSort';

export interface AlgorithmRegistryItem {
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
  },
  gnomeSort: {
    component: gnomeSort,
    path: 'gnome-sort',
    title: 'Gnome Sort',
    description: 'A simple sorting algorithm that works by repeatedly swapping adjacent elements that are in the wrong order, similar to how a garden gnome sorts flower pots.'
  },
  shakerSort: {
    component: shakerSort,
    path: 'shaker-sort',
    title: 'Cocktail Shaker Sort',
    description: 'A variation of Bubble Sort that sorts bidirectionally on each pass through the array, potentially reducing the total number of iterations needed.'
  },
  brickSort: {
    component: brickSort,
    path: 'brick-sort',
    title: 'Brick Sort',
    description: 'A parallel variation of bubble sort that alternates between sorting odd/even indexed pairs and even/odd indexed pairs of adjacent elements.'
  },
  pancakeSort: {
    component: pancakeSort,
    path: 'pancake-sort',
    title: 'Pancake Sort',
    description: 'A sorting algorithm that only uses flip operations, similar to flipping a stack of pancakes with a spatula.'
  },
  bogoSort: {
    component: bogoSort,
    path: 'bogo-sort',
    title: 'Bogo Sort',
    description: 'A deliberately inefficient sorting algorithm that randomly shuffles elements until they happen to be sorted. Also known as "Stupid Sort".'
  },
  stoogeSort: {
    component: stoogeSort,
    path: 'stooge-sort',
    title: 'Stooge Sort',
    description: 'A recursive sorting algorithm with a peculiar approach of sorting the first 2/3, last 2/3, and first 2/3 again. Known for its unusual and inefficient time complexity.'
  },
  shellSort: {
    component: shellSort,
    path: 'shell-sort',
    title: 'Shell Sort',
    description: 'An optimization of Insertion Sort that works by comparing elements with a gap between them, progressively reducing the gap size until the array is sorted.'
  },
  combSort: {
    component: combSort,
    path: 'comb-sort',
    title: 'Comb Sort',
    description: 'An improvement over Bubble Sort that compares elements with a shrinking gap, effectively dealing with small values near the end that typically slow down Bubble Sort.'
  },
  bitonicSort: {
    component: bitonicSort,
    path: 'bitonic-sort',
    title: 'Bitonic Sort',
    description: 'A parallel comparison sorting algorithm that first builds a bitonic sequence and then merges it into a sorted sequence. Requires input size to be a power of 2.'
  }
};
