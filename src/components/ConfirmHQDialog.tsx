import { useGameStore } from '../store/gameStore';
import { createPortal } from 'react-dom';

export const ConfirmHQDialog = () => {
  const { pendingHQ, setPendingHQ, setHQ } = useGameStore();

  const handleConfirm = () => {
    if (pendingHQ) {
      setHQ(pendingHQ);
      setPendingHQ(null);
    }
  };

  const dialog = (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-auto bg-black bg-opacity-50 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-out scale-100 opacity-100">
        <h2 id="dialog-title" className="text-xl font-bold mb-4 text-gray-800">
          Confirm HQ Location
        </h2>
        <p className="mb-4 text-gray-600">
          Coordinates: {pendingHQ?.lng.toFixed(4)}, {pendingHQ?.lat.toFixed(4)}
        </p>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            onClick={handleConfirm}
            aria-label="Rent this location as HQ"
          >
            Rent
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
            onClick={handleConfirm}
            aria-label="Buy this location as HQ"
          >
            Buy
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setPendingHQ(null)}
            aria-label="Cancel HQ selection"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}; 