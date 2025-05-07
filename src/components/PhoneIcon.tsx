import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

interface PhoneIconProps {
  onAccept?: () => void;
}

export const PhoneIcon = ({ onAccept }: PhoneIconProps = {}) => {
  const { incoming, acceptCall } = useGameStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (incoming && !audioRef.current) {
      audioRef.current = new Audio('/call.mp3');
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [incoming]);

  if (!incoming) return null;

  return (
    <button
      onClick={() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        acceptCall();
        onAccept?.();
      }}
      className="fixed top-4 right-4 animate-pulse"
      aria-label="Incoming call"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-12 h-12 text-green-500"
      >
        <path
          fillRule="evenodd"
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}; 