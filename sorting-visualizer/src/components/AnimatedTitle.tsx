// src/components/AnimatedTitle.tsx
import { useState, useEffect } from "react";

interface CharacterState {
  char: string;
  isCorrect: boolean;
  isComparing: boolean;
  originalIndex: number;
}

const AnimatedTitle = () => {
  const targetText = "ALL-SORTS";
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  // Initialize scrambled text
  useEffect(() => {
    const chars = targetText.split("").map((char, index) => ({
      char,
      isCorrect: false,
      isComparing: false,
      originalIndex: index,
    }));

    // Shuffle the characters
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    setCharacters(chars);
    setTimeout(() => setIsSorting(true), 500);
  }, []);

  // Check if text is sorted
  const checkIfSorted = (array: CharacterState[]) => {
    const currentText = array.map((char) => char.char).join("");
    return currentText === targetText;
  };

  useEffect(() => {
    if (!isSorting) return;

    const mergeSort = async (
      array: CharacterState[],
      start: number,
      end: number
    ) => {
      if (start < end) {
        const mid = Math.floor(start + (end - start) / 2);

        await mergeSort(array, start, mid);
        await mergeSort(array, mid + 1, end);
        await merge(array, start, mid, end);
      }
    };

    const merge = async (
      array: CharacterState[],
      start: number,
      mid: number,
      end: number
    ) => {
      const leftArray = array.slice(start, mid + 1);
      const rightArray = array.slice(mid + 1, end + 1);

      let i = 0,
        j = 0,
        k = start;

      while (i < leftArray.length && j < rightArray.length) {
        array[k].isComparing = true;
        setCharacters([...array]);
        await new Promise((resolve) => setTimeout(resolve, 50));

        if (leftArray[i].originalIndex <= rightArray[j].originalIndex) {
          array[k] = leftArray[i];
          i++;
        } else {
          array[k] = rightArray[j];
          j++;
        }

        array[k].isComparing = false;
        if (array[k].originalIndex === k) {
          array[k].isCorrect = true;
        }

        k++;
        setCharacters([...array]);
      }

      while (i < leftArray.length) {
        array[k] = leftArray[i];
        if (array[k].originalIndex === k) {
          array[k].isCorrect = true;
        }
        i++;
        k++;
        setCharacters([...array]);
      }

      while (j < rightArray.length) {
        array[k] = rightArray[j];
        if (array[k].originalIndex === k) {
          array[k].isCorrect = true;
        }
        j++;
        k++;
        setCharacters([...array]);
      }

      // Check if the entire array is sorted after each merge
      if (checkIfSorted(array)) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setIsComplete(true);
        setIsSorting(false);
        setTimeout(() => {
          setIsAnimating(false);
        }, 600);
      }
    };

    const startSorting = async () => {
      const arrayToSort = [...characters];
      await mergeSort(arrayToSort, 0, arrayToSort.length - 1);
    };

    startSorting();
  }, [isSorting, characters]);

  return (
    <div className="relative h-[200px]">
      <div
        className={`
          flex justify-center space-x-1
          transition-all duration-700 ease-in-out
          ${
            isAnimating
              ? "transform -translate-y-6 scale-110 tracking-wider"
              : "transform translate-y-0 scale-100 tracking-normal"
          }
        `}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className={`
              text-6xl md:text-7xl font-bold
              transition-all duration-200
              ${
                isComplete
                  ? "text-white"
                  : char.isComparing
                  ? "text-yellow-500 transform scale-110"
                  : char.isCorrect
                  ? "text-green-500"
                  : "text-white"
              }
            `}
          >
            {char.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;
