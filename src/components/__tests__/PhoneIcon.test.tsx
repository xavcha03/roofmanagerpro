import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhoneIcon } from '../PhoneIcon';
import { useGameStore } from '../../store/gameStore';

// Mock du store
vi.mock('../../store/gameStore', () => ({
  useGameStore: vi.fn(),
}));

// Mock de l'API Audio
const mockPlay = vi.fn();
const mockPause = vi.fn();
global.Audio = vi.fn().mockImplementation(() => ({
  play: mockPlay,
  pause: mockPause,
  volume: 0,
}));

describe('PhoneIcon', () => {
  const mockAcceptCall = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useGameStore as any).mockImplementation(() => ({
      incoming: false,
      acceptCall: mockAcceptCall,
    }));
  });

  it('is hidden when no incoming call', () => {
    render(<PhoneIcon />);
    const button = screen.queryByRole('button', { name: /incoming call/i });
    expect(button).not.toBeInTheDocument();
  });

  it('is visible when there is an incoming call', () => {
    (useGameStore as any).mockImplementation(() => ({
      incoming: true,
      acceptCall: mockAcceptCall,
    }));

    render(<PhoneIcon />);
    const button = screen.getByRole('button', { name: /incoming call/i });
    expect(button).toBeInTheDocument();
  });

  it('plays sound when incoming call starts', () => {
    (useGameStore as any).mockImplementation(() => ({
      incoming: true,
      acceptCall: mockAcceptCall,
    }));

    render(<PhoneIcon />);
    expect(global.Audio).toHaveBeenCalledWith('/call.mp3');
    expect(mockPlay).toHaveBeenCalled();
  });

  it('stops sound and calls acceptCall when clicked', async () => {
    (useGameStore as any).mockImplementation(() => ({
      incoming: true,
      acceptCall: mockAcceptCall,
    }));

    render(<PhoneIcon />);
    const button = screen.getByRole('button', { name: /incoming call/i });
    await userEvent.click(button);

    expect(mockPause).toHaveBeenCalled();
    expect(mockAcceptCall).toHaveBeenCalled();
  });
}); 