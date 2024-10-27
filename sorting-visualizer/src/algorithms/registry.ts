// src/algorithms/registry.ts
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { SortingAlgorithm } from '../types/sortingTypes';

interface AlgorithmRegistry {
  [key: string]: {
    component: SortingAlgorithm;
    path: string;
    title: string;
    description: string;
  };
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
  }
};