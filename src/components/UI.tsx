import { useGameStore } from '../store/gameStore';
import { ConfirmHQDialog } from './ConfirmHQDialog';

export const UI: React.FC = () => {
  const pendingHQ = useGameStore((state) => state.pendingHQ);

  return (
    <div 
      id="ui" 
      data-testid="ui" 
      className="fixed inset-0 pointer-events-none z-10"
      style={{ zIndex: 1000 }}
    >
      <div className="relative w-full h-full">
        {pendingHQ && <ConfirmHQDialog />}
      </div>
    </div>
  );
}; 