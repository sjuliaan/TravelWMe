import { useState } from 'react';
import { RoomScene } from './RoomScene';
import { OutdoorScene } from './OutdoorScene';

type GameState = 'room' | 'outdoor' | 'victory';

export const PixelRPG = () => {
  const [gameState, setGameState] = useState<GameState>('room');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSceneTransition = (newState: GameState) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setGameState(newState);
      setIsTransitioning(false);
    }, 500);
  };

  const handleExitRoom = () => {
    handleSceneTransition('outdoor');
  };

  const handleFindBoyfriend = () => {
    handleSceneTransition('victory');
  };

  const handleRestart = () => {
    handleSceneTransition('room');
  };

  if (isTransitioning) {
    return (
      <div className="w-full h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 animate-character-bounce"></div>
          <p className="text-pixel-lg font-pixel text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (gameState === 'victory') {
    return (
      <div className="w-full h-screen bg-gradient-ui flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20"></div>
        <div className="relative z-10 text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-pixel-lg font-pixel text-foreground mb-4 animate-character-bounce">
              🎮 Love Quest Complete! 💕
            </h1>
            <p className="text-pixel-base font-pixel text-foreground/80 mb-2">
              Your journey brought you together!
            </p>
            <p className="text-pixel-sm font-pixel text-muted-foreground">
              Distance means nothing when love is everything
            </p>
          </div>
          
          <button
            onClick={handleRestart}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-pixel text-pixel-sm px-6 py-3 rounded border-2 border-primary-foreground/20 transition-all duration-200 hover:scale-105 shadow-pixel"
          >
            Play Again 🔄
          </button>
          
          <div className="mt-8 text-center">
            <p className="text-pixel-xs font-pixel text-muted-foreground">
              Made with 💕 for someone special
            </p>
          </div>
        </div>
        
        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-character-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              💕
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen font-pixel">
      {gameState === 'room' && <RoomScene onExit={handleExitRoom} />}
      {gameState === 'outdoor' && <OutdoorScene onFindBoyfriend={handleFindBoyfriend} />}
    </div>
  );
};