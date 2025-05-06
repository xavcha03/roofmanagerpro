import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Mock window.URL.createObjectURL
window.URL.createObjectURL = vi.fn();

// Étend les matchers de Vitest avec ceux de @testing-library/jest-dom
expect.extend(matchers);

// Nettoie après chaque test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 