
import { useState, useEffect } from 'react';
import girlfriendSprite from '@/assets/girlfriend-character.png';

interface CharacterProps {
  x: number;
  y: number;
  isMoving: boolean;
  direction: 'left' | 'right' | 'up' | 'down';
}

export const Character = ({ x, y, isMoving, direction }: CharacterProps) => {
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setAnimationFrame(frame => (frame + 1) % 2);
    }, 200);

    return () => clearInterval(interval);
  }, [isMoving]);

  return (
    <div
      className={`absolute z-20 w-16 h-16 transition-all duration-100 ${
        isMoving ? 'animate-character-bounce' : ''
      }`}
      style={{ 
        left: `${x}px`, 
        top: `${y + (isMoving ? animationFrame * 2 : 0)}px`,
        transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
      }}
    >
      <img
        src={girlfriendSprite}
        alt="Character"
        className="w-full h-full object-contain image-rendering-pixelated pixelated"
        draggable={false}
      />
      {isMoving && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full animate-pulse" />
      )}
    </div>
  );
};
