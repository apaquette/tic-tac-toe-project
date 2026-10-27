export default function Row({row, rowIndex, onClick}){
    return <li key={rowIndex}>
        <ol>
            {row.map((symbol, colIndex) => (
                <li key={colIndex}>
                    <button onClick={() => onClick(rowIndex, colIndex)} disabled={symbol !== null}>
                        {symbol}
                    </button>
                </li>
            ))}
        </ol>
    </li>
}