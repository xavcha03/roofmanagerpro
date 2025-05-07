import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuoteDialog } from '../QuoteDialog';

describe('QuoteDialog', () => {
  it('has correct ARIA attributes', () => {
    render(<QuoteDialog isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/surface/i)).toBeInTheDocument();
  });

  it('disables submit button when input is empty', () => {
    render(<QuoteDialog isOpen={true} onClose={() => {}} />);
    
    const submitButton = screen.getByRole('button', { name: /valider/i });
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when input is invalid', async () => {
    render(<QuoteDialog isOpen={true} onClose={() => {}} />);
    
    const input = screen.getByLabelText(/surface/i);
    await userEvent.type(input, '-1');
    
    const submitButton = screen.getByRole('button', { name: /valider/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when input is valid', async () => {
    render(<QuoteDialog isOpen={true} onClose={() => {}} />);
    
    const input = screen.getByLabelText(/surface/i);
    await userEvent.type(input, '100');
    
    const submitButton = screen.getByRole('button', { name: /valider/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onClose when cancel button is clicked', async () => {
    const onClose = vi.fn();
    render(<QuoteDialog isOpen={true} onClose={onClose} />);
    
    const cancelButton = screen.getByRole('button', { name: /annuler/i });
    await userEvent.click(cancelButton);
    
    expect(onClose).toHaveBeenCalled();
  });
}); 