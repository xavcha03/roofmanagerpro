import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ConfirmHQDialog } from '../components/ConfirmHQDialog';
import { useGameStore } from '../store/gameStore';
import userEvent from '@testing-library/user-event';

describe('ConfirmHQDialog', () => {
  const mockPendingHQ = { lng: 2.3522, lat: 48.8566 };

  beforeEach(() => {
    useGameStore.setState({
      pendingHQ: mockPendingHQ,
      hq: null,
      map: null,
    });
  });

  it('renders dialog with title', () => {
    render(<ConfirmHQDialog />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm HQ Location')).toBeInTheDocument();
  });

  it('handles rent confirmation', async () => {
    render(<ConfirmHQDialog />);
    await act(async () => {
      screen.getByText('Rent').click();
    });
    
    const state = useGameStore.getState();
    expect(state.hq).toEqual(mockPendingHQ);
    expect(state.pendingHQ).toBeNull();
  });

  it('handles buy confirmation', async () => {
    render(<ConfirmHQDialog />);
    await act(async () => {
      screen.getByText('Buy').click();
    });
    
    const state = useGameStore.getState();
    expect(state.hq).toEqual(mockPendingHQ);
    expect(state.pendingHQ).toBeNull();
  });

  it('handles cancellation', async () => {
    render(<ConfirmHQDialog />);
    await act(async () => {
      screen.getByText('Cancel').click();
    });
    
    const state = useGameStore.getState();
    expect(state.hq).toBeNull();
    expect(state.pendingHQ).toBeNull();
  });

  it('has correct button order and styling', () => {
    render(<ConfirmHQDialog />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    
    // Verify button order
    expect(buttons[0]).toHaveTextContent('Rent');
    expect(buttons[1]).toHaveTextContent('Buy');
    expect(buttons[2]).toHaveTextContent('Cancel');
    
    // Verify buttons are styled correctly
    const [rentButton, buyButton, cancelButton] = buttons;
    
    expect(rentButton).toHaveClass('bg-blue-500');
    expect(buyButton).toHaveClass('bg-green-500');
    expect(cancelButton).toHaveClass('bg-gray-500');
    
    // Common styles
    buttons.forEach(button => {
      expect(button).toHaveClass('text-white', 'rounded');
    });
  });
}); 