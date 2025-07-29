import React from 'react';
import { useGameState } from './GameState';
import GameBoard from './GameBoard';
import PlayerRack from './PlayerRack';
import ScoreBoard from './ScoreBoard';
import GameControls from './GameControls';
import '../styles/GamePage.css';

const ScrabbleGame = () => {
  
  const gameState = useGameState();

  return (
    <div className="game-container">
      <div className="game-layout">
        <div className="left-panel">
          <GameBoard 
            gameState={gameState} 
            placeTile={gameState.placeTile}
          />
        </div>
        
        <div className="right-panel">
          <h2 className="panel-title">Scrabble Game</h2>
          
          <ScoreBoard 
            scores={gameState.scores}
            currentPlayer={gameState.currentPlayer}
          />
          
          <PlayerRack 
            currentPlayer={gameState.currentPlayer}
            player1Tiles={gameState.player1Tiles}
            player2Tiles={gameState.player2Tiles}
          />
          
          <GameControls 
            currentMove={gameState.currentMove}
            onSubmitWord={gameState.submitWord}
            onRecallTiles={gameState.recallTiles}
            onShuffleTiles={gameState.shuffleTiles}
            onResetGame={gameState.resetGame}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrabbleGame;