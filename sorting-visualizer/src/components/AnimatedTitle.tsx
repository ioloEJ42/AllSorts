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
    // Create a more deterministic mapping for same-character positions
    const chars = targetText.split("").map((char, index) => ({
      char,
      isCorrect: false,
      isComparing: false,
      originalIndex: index, // Keep original index as is
    }));

    // Fisher-Yates shuffle to ensure proper randomization
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
      // Don't modify originalIndex during shuffle
    }

    // Verify shuffle produced a different arrangement
    const isShuffled = chars.some((char, index) => char.char !== targetText[index]);
    if (!isShuffled) {
      // If not shuffled enough, shuffle one more time
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }
    }

    setCharacters(chars);
    setTimeout(() => setIsSorting(true), 500);
  }, []);

  // Simplified check for sorting
  const checkIfSorted = (array: CharacterState[]): boolean => {
    return array.every((char, index) => char.originalIndex === index);
  };

  // Rest of your code remains the same...

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
      {/* Optional scanning line effect */}
      {isSorting && (
        <div 
          className="absolute left-0 right-0 h-px bg-white/20 blur-sm"
          style={{
            top: '50%',
            animation: 'scan 2s ease-in-out infinite'
          }}
        />
      )}
      
      <div
        className={`
          flex justify-center space-x-1
          transition-all duration-700 ease-in-out
          ${isAnimating ? "transform scale-90" : "transform scale-150"}
        `}
      >
        {characters.map((char, index) => (
          <div key={index} className="relative">
            {/* Character */}
            <span
              className={`
                text-6xl md:text-7xl font-bold
                inline-block
                transition-all duration-200
                ${
                  isComplete
                    ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    : char.isComparing
                    ? "text-white scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    : char.isCorrect
                    ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                    : "text-white/80"
                }
                ${!isComplete && char.isComparing ? "animate-bounce-subtle" : ""}
              `}
            >
              {char.char}
            </span>
  
            {/* Underline indicator */}
            <div
              className={`
                absolute bottom-0 left-0 w-full h-[2px]
                transition-all duration-200
                ${
                  char.isComparing
                    ? "bg-white w-full"
                    : char.isCorrect
                    ? "bg-white/50 w-full"
                    : "bg-white/30 w-0"
                }
              `}
            />
  
            {/* Optional particle effects when comparing - only show if not complete */}
            {!isComplete && char.isComparing && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <div className="w-full bg-white/50 animate-glow" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTitle;