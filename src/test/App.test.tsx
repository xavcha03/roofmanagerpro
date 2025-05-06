import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

// Mock les composants enfants pour éviter les problèmes de rendu
vi.mock('../components/Map', () => ({
  Map: () => <div data-testid="mock-map">Map Component</div>,
}));

vi.mock('../components/UI', () => ({
  UI: () => <div data-testid="mock-ui">UI Component</div>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
}); 