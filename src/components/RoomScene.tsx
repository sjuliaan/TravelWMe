import { useState, useEffect } from 'react';
import roomBackground from '@/assets/room-background.png';
import { Character } from './Character';

interface RoomSceneProps {
  onExit: () => void;
}

export const RoomScene = ({ onExit }: RoomSceneProps) => {
  const [characterPos, setCharacterPos] = useState({ x: 400, y: 300 });
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | 'down'>('down');
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());

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
      if (keysPressed.size === 0) {
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

      // Room boundaries  
      newX = Math.max(20, Math.min(780, newX));
      newY = Math.max(20, Math.min(560, newY));

      // Exit door (right side of room) - wider trigger area
      if (newX > 720 && newY > 250 && newY < 350) {
        console.log('Character reached the door!');
        setTimeout(() => onExit(), 500);
      }

      setCharacterPos({ x: newX, y: newY });
      setDirection(newDirection);
    }, 16);

    return () => clearInterval(moveInterval);
  }, [keysPressed, characterPos, direction, onExit]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-room">
      {/* Room Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${roomBackground})` }}
      />
      
      {/* Room Elements Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-room-floor/20" />
      
      {/* Visible Door */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-20 bg-room-furniture border-4 border-room-wall rounded-lg shadow-pixel flex items-center justify-center">
        <div className="w-6 h-16 bg-gradient-to-b from-room-wall to-room-furniture rounded border border-room-wall/50 relative">
          <div className="absolute right-1 top-1/2 w-1 h-1 bg-secondary rounded-full"></div>
        </div>
      </div>
      
      {/* Exit hint */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded border border-border animate-pulse">
        <p className="text-pixel-sm font-pixel text-foreground">🚪 Door</p>
        <p className="text-pixel-xs font-pixel text-muted-foreground">Walk here to exit!</p>
      </div>

      {/* Character */}
      <Character 
        x={characterPos.x} 
        y={characterPos.y} 
        isMoving={isMoving} 
        direction={direction} 
      />

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm px-4 py-2 rounded border border-border">
        <p className="text-pixel-sm font-pixel text-foreground">Use WASD or Arrow Keys to move</p>
        <p className="text-pixel-xs font-pixel text-muted-foreground">Find the exit to begin your journey!</p>
      </div>
    </div>
  );
};