import { useState, useEffect } from 'react';
import { Map } from './components/Map';
import { UI } from './components/UI';
import { PhoneIcon } from './components/PhoneIcon';
import { QuoteDialog } from './components/QuoteDialog';
import { useGameStore } from './store/gameStore';

const App = () => {
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const { scheduleNextCall } = useGameStore();

  useEffect(() => {
    // Démarre le cycle d'appels au montage
    scheduleNextCall();
    // Nettoie les timers au démontage (géré dans le slice)
  }, [scheduleNextCall]);

  return (
    <>
      <Map />
      <UI />
      <PhoneIcon onAccept={() => setIsQuoteDialogOpen(true)} />
      <QuoteDialog isOpen={isQuoteDialogOpen} onClose={() => setIsQuoteDialogOpen(false)} />
    </>
  );
};

export default App; 