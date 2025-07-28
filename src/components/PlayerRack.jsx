import React from 'react';
import '../styles/PlayerRack.css';

const PlayerRack = ({ currentPlayer, player1Tiles, player2Tiles }) => {
  const currentTiles = currentPlayer === 1 ? player1Tiles : player2Tiles;
  
  const tileSlots = Array(7).fill(null);
  currentTiles.forEach((tile, index) => {
    if (index < 7) tileSlots[index] = tile;
  });
  
  const handleDragStart = (e, tile, index) => {
    if (!tile) return;
    
    e.dataTransfer.setData('tileIndex', index.toString());
    e.dataTransfer.setData('tileLetter', tile.letter);
    e.dataTransfer.setData('tilePoints', tile.points.toString());
  };

  return (
    <div className="player-rack-container">
      <h3>Player {currentPlayer}'s Tiles</h3>
      <div className="player-rack">
        {tileSlots.map((tile, index) => (
          <div key={index} className="player-tile-slot">
            {tile ? (
              <div
                className="player-tile"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, tile, index)}
              >
                <span className="tile-letter">{tile.letter === 'Blank' ? '' : tile.letter}</span>
                <span className="tile-points">{tile.points}</span>
                {tile.letter === 'Blank' && <span className="blank-label">Blank</span>}
              </div>
            ) : (
              <div className="empty-slot"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerRack;