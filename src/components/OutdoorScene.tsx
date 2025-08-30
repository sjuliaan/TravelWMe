import { useState, useEffect } from 'react';
import outdoorBackground from '@/assets/outdoor-background.png';
import boyfriendSprite from '@/assets/boyfriend-character.png';
import { Character } from './Character';

interface OutdoorSceneProps {
  onFindBoyfriend: () => void;
}

export const OutdoorScene = ({ onFindBoyfriend }: OutdoorSceneProps) => {
  const [characterPos, setCharacterPos] = useState({ x: 50, y: 300 });
  const [cameraOffset, setCameraOffset] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [foundBoyfriend, setFoundBoyfriend] = useState(false);

  // Boyfriend position (far to the right)
  const boyfriendPos = { x: 1800, y: 250 };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
        setKeysPressed(prev => new Set([...prev, key]));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (keysPressed.size === 0 || foundBoyfriend) {
        setIsMoving(false);
        return;
      }

      setIsMoving(true);
      const speed = 4;
      let newX = characterPos.x;
      let newY = characterPos.y;
      let newDirection = direction;

      if (keysPressed.has('a') || keysPressed.has('arrowleft')) {
        newX -= speed;
        newDirection = 'left';
      }
      if (keysPressed.has('d') || keysPressed.has('arrowright')) {
        newX += speed;
        newDirection = 'right';
      }
      if (keysPressed.has('w') || keysPressed.has('arrowup')) {
        newY -= speed;
        newDirection = 'up';
      }
      if (keysPressed.has('s') || keysPressed.has('arrowdown')) {
        newY += speed;
        newDirection = 'down';
      }

      // World boundaries
      newX = Math.max(0, Math.min(2000, newX));
      newY = Math.max(100, Math.min(500, newY));

      // Check if found boyfriend
      const distance = Math.sqrt(
        Math.pow(newX - boyfriendPos.x, 2) + Math.pow(newY - boyfriendPos.y, 2)
      );
      
      if (distance < 80 && !foundBoyfriend) {
        setFoundBoyfriend(true);
        setTimeout(() => onFindBoyfriend(), 1000);
      }

      setCharacterPos({ x: newX, y: newY });
      setDirection(newDirection);

      // Update camera to follow character
      const screenCenter = window.innerWidth / 2;
      const newCameraOffset = Math.max(0, Math.min(1200, newX - screenCenter));
      setCameraOffset(newCameraOffset);
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, characterPos, direction, foundBoyfriend, onFindBoyfriend]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-outdoor">
      {/* Outdoor Background - moves with camera */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat w-[200%] h-full transition-transform duration-100"
        style={{ 
          backgroundImage: `url(${outdoorBackground})`,
          transform: `translateX(-${cameraOffset}px)`
        }}
      />
      
      {/* Sky gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-outdoor-sky/30 to-transparent" />

      {/* Boyfriend Character - positioned in world coordinates */}
      <div
        className="absolute z-20 w-16 h-16 transition-all duration-100"
        style={{ 
          transform: `translate(${boyfriendPos.x - cameraOffset}px, ${boyfriendPos.y}px)` 
        }}
      >
        <img
          src={boyfriendSprite}
          alt="Boyfriend"
          className="w-full h-full object-contain image-rendering-pixelated pixelated"
          draggable={false}
        />
        {!foundBoyfriend && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="bg-secondary px-2 py-1 rounded text-pixel-xs font-pixel text-secondary-foreground">
              💕
            </div>
          </div>
        )}
      </div>

      {/* Character - positioned relative to camera */}
      <Character 
        x={characterPos.x - cameraOffset} 
        y={characterPos.y} 
        isMoving={isMoving} 
        direction={direction} 
      />

      {/* UI Elements */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded border border-border">
        <p className="text-pixel-sm font-pixel text-foreground">Find your love! 💕</p>
        <p className="text-pixel-xs font-pixel text-muted-foreground">Travel right to explore the world</p>
      </div>

      {/* Distance indicator */}
      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded border border-border">
        <p className="text-pixel-xs font-pixel text-muted-foreground">
          Distance: {Math.floor(Math.abs(characterPos.x - boyfriendPos.x) / 10)}m
        </p>
      </div>

      {foundBoyfriend && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="bg-card p-8 rounded-lg border border-border text-center animate-scale-in">
            <h2 className="text-pixel-lg font-pixel text-foreground mb-4">You found each other! 💕</h2>
            <p className="text-pixel-sm font-pixel text-muted-foreground">True love conquers all distances</p>
          </div>
        </div>
      )}
    </div>
  );
};