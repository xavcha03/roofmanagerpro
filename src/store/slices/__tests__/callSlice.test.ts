import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCallSlice } from '../callSlice';
import type { StateCreator } from 'zustand';
import type { GameState } from '../../types';

describe('callSlice', () => {
  let set: (partial: any) => void;
  let get: () => any;
  let slice: ReturnType<typeof createCallSlice>;

  beforeEach(() => {
    vi.useFakeTimers();
    set = vi.fn();
    get = vi.fn();
    slice = createCallSlice(set, get, {} as any);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('scheduleNextCall', () => {
    it('sets timer within bounds (30-90s)', () => {
      slice.scheduleNextCall();
      
      // Vérifie qu'un timer a été créé
      expect(vi.getTimerCount()).toBe(1);
      
      // Vérifie que le délai est entre 30 et 90 secondes en déclenchant le timer
      vi.advanceTimersByTime(29999);
      expect(set).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(60001);
      expect(set).toHaveBeenCalledWith({ incoming: true });
    });

    it('sets incoming=true when timer completes', () => {
      slice.scheduleNextCall();
      
      // Avance le temps de 90s pour être sûr que le timer se déclenche
      vi.advanceTimersByTime(90000);
      
      expect(set).toHaveBeenCalledWith({ incoming: true });
    });

    it('clears existing timer before setting new one', () => {
      slice.scheduleNextCall();
      const firstTimerCount = vi.getTimerCount();
      
      slice.scheduleNextCall();
      const secondTimerCount = vi.getTimerCount();
      
      expect(secondTimerCount).toBe(firstTimerCount);
    });
  });

  describe('acceptCall', () => {
    it('sets incoming=false and schedules next call', () => {
      slice.acceptCall();
      
      expect(set).toHaveBeenCalledWith({ incoming: false });
      expect(vi.getTimerCount()).toBe(1);
    });
  });
}); 