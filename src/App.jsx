import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import GameOver from "./components/GameOver";
import Log from "./components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations";

function deriveActivePlayer(turns){
      let currentPlayer = 'X';

      if(turns.length > 0 && turns[0].player === 'X'){
        currentPlayer = 'O';
      }
      return currentPlayer;
}

function deriveGameBoard(turns){
  let gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
  ];

  for(const turn of turns){
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(board){
  for (const combination of WINNING_COMBINATIONS){
    const firstSymbol = board[combination[0].row][combination[0].column];
    const secondSymbol = board[combination[1].row][combination[1].column];
    const thirdSymbol = board[combination[2].row][combination[2].column];

    if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol){
      return firstSymbol;
    }

  }
  return null;
}

function App() {
  const [players, setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard);
  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }


  return <main>
    <div id="game-container">
    <ol id="players" className="highlight-player">
      <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
      <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
    </ol>
    {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
    <GameBoard 
      onSelectSquare={handleSelectSquare} 
      board={gameBoard}
    />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
