import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { UI } from '../components/UI';

describe('UI', () => {
  it('renders UI layer', () => {
    render(<UI />);
    const uiLayer = screen.getByTestId('ui');
    expect(uiLayer).toBeInTheDocument();
  });

  it('has correct z-index styling', () => {
    render(<UI />);
    const uiLayer = screen.getByTestId('ui');
    expect(uiLayer.className).toContain('z-10');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<UI />);
    const results = await axe(container);
    expect(Object.keys(results.violations).length).toBe(0);
  });
}); 