# All-Sorts - Algorithm Visualization Platform

A modern, interactive sorting algorithm visualization tool built with React, TypeScript, and Tailwind CSS. This project aims to make understanding sorting algorithms intuitive through real-time visual feedback and interactive controls.

## Current Implementation

- **Algorithms Implemented:**

  - Bubble Sort (O(n²))
  - Selection Sort (O(n²))

- **Technical Stack:**
  - React 18 with TypeScript
  - Vite for build tooling
  - Tailwind CSS for styling
  - React Router for navigation

## Core Features

### Visualization Engine

- Real-time visual representation of array operations
- Color-coded state management (white: unsorted, yellow: comparing, green: sorted)
- Dynamic array size control (5-200 elements)
- Configurable sorting speed
- Abort functionality for stopping mid-sort

### Architecture

- Modular algorithm implementation using Higher-Order Functions
- Centralized sorting wrapper for consistent error handling and abort control
- Type-safe implementation with TypeScript
- Component-based architecture for easy expansion

### User Interface

- Full-screen algorithm visualization
- Interactive controls for array manipulation
- Real-time performance metrics
- Responsive design for all screen sizes
- Educational content for each algorithm

## Planned Expansions

- Additional algorithms (Quick Sort, Merge Sort, Heap Sort)
- Algorithm comparison view
- Step-by-step execution mode
- Performance analytics
- Custom array input

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── algorithms/        # Sorting algorithm implementations
├── components/        # React components
├── types/            # TypeScript definitions
├── utils/            # Utility functions and wrappers
└── pages/            # Route pages
```

## Contributing

This project is in active development. Contributions are welcome! See the issues page for planned features and known bugs.

## License

MIT License - See LICENSE file for details
