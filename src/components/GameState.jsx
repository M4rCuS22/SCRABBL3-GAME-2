import React, { useState } from 'react';
import tileDistribution from '../data/tileDistibution';


export function useGameState() {
  
  const createInitialTiles = () => {
    const allTiles = [];
    tileDistribution.forEach(tile => {
      for (let i = 0; i < tile.count; i++) {
        allTiles.push({ ...tile });
      }
    });
    
    
    for (let i = allTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
    }
    
    
    const player1Tiles = allTiles.slice(0, 7);
    const player2Tiles = allTiles.slice(7, 14);
    const remainingTiles = allTiles.slice(14);
    
    return {
      player1: player1Tiles,
      player2: player2Tiles,
      remaining: remainingTiles
    };
  };

  const initialTiles = createInitialTiles();
  
  // Simple state variables
  const [boardTiles, setBoardTiles] = useState({});
  const [player1Tiles, setPlayer1Tiles] = useState(initialTiles.player1);
  const [player2Tiles, setPlayer2Tiles] = useState(initialTiles.player2);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentMove, setCurrentMove] = useState([]);
  const [showBlankModal, setShowBlankModal] = useState(false);
  const [blankPosition, setBlankPosition] = useState(null);

  // Simple functions to update game state
  const placeTile = (position, tile, tileIndex) => {
    setBoardTiles(prev => ({
      ...prev,
      [position]: tile
    }));
    
    setCurrentMove(prev => [...prev, { position, tile }]);
    
    // Remove tile from current player's rack
    if (currentPlayer === 1) {
      setPlayer1Tiles(prev => prev.filter((_, index) => index !== tileIndex));
    } else {
      setPlayer2Tiles(prev => prev.filter((_, index) => index !== tileIndex));
    }
  };

  const submitWord = () => {
    // Simple scoring - just add up tile points
    let score = 0;
    currentMove.forEach(move => {
      score += move.tile.points || 0;
    });
    
    // Add score to current player
    if (currentPlayer === 1) {
      setScores(prev => ({ ...prev, player1: prev.player1 + score }));
    } else {
      setScores(prev => ({ ...prev, player2: prev.player2 + score }));
    }
    
    // Clear current move and switch players
    setCurrentMove([]);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const recallTiles = () => {
    // Put tiles back in player's rack
    const tilesToReturn = currentMove.map(move => move.tile);
    
    if (currentPlayer === 1) {
      setPlayer1Tiles(prev => [...prev, ...tilesToReturn]);
    } else {
      setPlayer2Tiles(prev => [...prev, ...tilesToReturn]);
    }
    
    // Remove tiles from board
    const newBoardTiles = { ...boardTiles };
    currentMove.forEach(move => {
      delete newBoardTiles[move.position];
    });
    setBoardTiles(newBoardTiles);
    setCurrentMove([]);
  };

  const shuffleTiles = () => {
    const currentTiles = currentPlayer === 1 ? player1Tiles : player2Tiles;
    const shuffled = [...currentTiles];
    
    // Simple shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    if (currentPlayer === 1) {
      setPlayer1Tiles(shuffled);
    } else {
      setPlayer2Tiles(shuffled);
    }
  };

  const resetGame = () => {
    const newTiles = createInitialTiles();
    setBoardTiles({});
    setPlayer1Tiles(newTiles.player1);
    setPlayer2Tiles(newTiles.player2);
    setCurrentPlayer(1);
    setScores({ player1: 0, player2: 0 });
    setCurrentMove([]);
    setShowBlankModal(false);
    setBlankPosition(null);
  };

  return {
    // Game state
    boardTiles,
    player1Tiles,
    player2Tiles,
    currentPlayer,
    scores,
    currentMove,
    showBlankModal,
    blankPosition,
    
    // Game functions
    placeTile,
    submitWord,
    recallTiles,
    shuffleTiles,
    resetGame,
    setShowBlankModal,
    setBlankPosition
  };
}