// src/pages/BubbleSort.tsx
import AlgorithmTemplate from "../components/AlgorithmTemplate";

const BubbleSort = () => {
  return (
    <AlgorithmTemplate
      title="Bubble Sort"
      description="Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed."
      timeComplexity={{
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      }}
      spaceComplexity="O(1)"
    />
  );
};

export default BubbleSort;
