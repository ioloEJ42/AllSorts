# All-Sorts - Advanced Algorithm Visualization Platform

A modern, interactive sorting algorithm visualization platform showcasing 15+ algorithms through real-time visualization. Built with React, TypeScript, and Tailwind CSS.

## Features

### Algorithm Categories

#### Logarithmic (O(n log n)):

- Quick Sort
- Merge Sort
- Heap Sort

#### Quadratic (O(n²)):

- Bubble Sort
- Selection Sort
- Insertion Sort
- Shell Sort
- Comb Sort
- Brick Sort
- Cocktail Sort
- Pancake Sort
- Gnome Sort

#### Unique & Experimental:

- Bitonic Sort (requires power-of-2 arrays)
- Bogo Sort
- Radix Sort
- Stooge Sort

### Technical Features

- Real-time visualization engine
- Interactive array controls (size: 5-200 elements)
- Variable sorting speeds
- Abort control system
- Toast notifications
- Smooth page transitions

### Visualization States

- **White**: Unsorted elements
- **Yellow**: Active comparisons
- **Green**: Sorted elements

### Technical Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Hot Toast for notifications
- Vite for build tooling

### Architecture

```
src/
├── algorithms/        # Sorting implementations
├── components/        # React components
├── types/             # TypeScript definitions
├── utils/             # HOFs and wrappers
└── pages/             # Route pages
```

### Getting Started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
```

### Type-Safe Implementation

```typescript
export interface SortingAlgorithm {
  name: string;
  execute: (array: ArrayBar[], ...) => Promise<void>;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  category: 'logarithmic' | 'quadratic' | 'odd';
  requiresPowerOf2?: boolean;
}
```

## Contributing

Active development. Contributions welcome. See issues for planned features.

## Live Demo

[https://all-sorts.netlify.app/](https://all-sorts.netlify.app/)

## License

MIT License - See LICENSE file for details
