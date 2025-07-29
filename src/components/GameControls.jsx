import React from 'react';
import '../styles/GameControls.css';

const GameControls = ({ 
  currentMove, 
  onSubmitWord, 
  onRecallTiles, 
  onShuffleTiles, 
  onResetGame 
}) => {
  const handleSubmit = () => {
    if (currentMove.length > 0) {
      onSubmitWord();
    }
  };

  const handleRecall = () => {
    if (currentMove.length > 0) {
      onRecallTiles();
    }
  };

  const handleShuffle = () => {
    if (currentMove.length === 0) {
      onShuffleTiles();
    }
  };

  return (
    <div className="game-controls">
      <div className="controls-row">
        <button 
          className="control-button submit-button"
          onClick={handleSubmit}
          disabled={currentMove.length === 0}
        >
          Submit Word
        </button>
        
        <button 
          className="control-button recall-button"
          onClick={handleRecall}
          disabled={currentMove.length === 0}
        >
          Recall Tiles
        </button>
      </div>
      
      <div className="controls-row">
        <button 
          className="control-button shuffle-button"
          onClick={handleShuffle}
          disabled={currentMove.length > 0}
        >
          Shuffle Tiles
        </button>
        
        <button 
          className="control-button reset-button"
          onClick={onResetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;