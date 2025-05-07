import { useState } from 'react';
import { Dialog } from '@headlessui/react';

interface QuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteDialog = ({ isOpen, onClose }: QuoteDialogProps) => {
  const [surface, setSurface] = useState('');
  const isValid = surface !== '' && !isNaN(Number(surface)) && Number(surface) > 0;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
      aria-labelledby="quote-dialog-title"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 shadow-xl">
          <Dialog.Title
            id="quote-dialog-title"
            className="text-lg font-medium leading-6 text-gray-900 mb-4"
          >
            Demande de devis
          </Dialog.Title>

          <div className="mt-2">
            <label
              htmlFor="surface"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Surface (m²)
            </label>
            <input
              type="number"
              id="surface"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Entrez la surface"
              min="1"
            />
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={!isValid}
            >
              Valider
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 