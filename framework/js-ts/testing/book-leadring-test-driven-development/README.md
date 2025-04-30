# TypeScript TDD Project with Jest

This project is set up for Test-Driven Development (TDD) using TypeScript and Jest.

## Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the project
npm run build

# Run the application
npm start

# Development mode (build and run)
npm run dev
```

## Project Structure

- `src/`: Source code
- `__tests__/`: Test files
- `dist/`: Compiled JavaScript (generated)

## Writing Tests

Test files should be placed in the `__tests__` directory with a `.test.ts` extension.

Example:

```typescript
// __tests__/example.test.ts
import { add } from "../src/example";

describe("add function", () => {
  it("should add two numbers correctly", () => {
    expect(add(1, 2)).toBe(3);
  });
});
```
