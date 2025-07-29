import React from 'react';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ scores, currentPlayer }) => {
  return (
    <div className="score-board">
      <h3>Scores</h3>
      <div className="scores">
        <div className={`player-score ${currentPlayer === 1 ? 'current-player' : ''}`}>
          <span className="player-name">Player 1</span>
          <span className="player-points">{scores.player1}</span>
        </div>
        <div className={`player-score ${currentPlayer === 2 ? 'current-player' : ''}`}>
          <span className="player-name">Player 2</span>
          <span className="player-points">{scores.player2}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;