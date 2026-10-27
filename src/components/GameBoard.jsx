import Row from "./Row";



export default function GameBoard({ onSelectSquare, board }){
    return <ol id="game-board">
        {board.map((row, index) => <Row row={row} rowIndex={index} onClick={onSelectSquare} />)}
    </ol>
}