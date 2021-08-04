import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const Square = ({val, onClick}) => {
    return (
        <button className="square" onClick={ onClick } >
            { val }
        </button>
    )
}

const Board = ({squares, onClick}) => {
    const renderSquare = (i) => {
        return <Square val={squares[i]} onClick={() => onClick(i)} />;
    }

    return (
        <>
            <div className="board-row">
                { renderSquare(0) }
                { renderSquare(1) }
                { renderSquare(2) }
            </div>
            <div className="board-row">
                { renderSquare(3) }
                { renderSquare(4) }
                { renderSquare(5) }
            </div>
            <div className="board-row">
                { renderSquare(6) }
                { renderSquare(7) }
                { renderSquare(8) }
            </div>
        </>
    );
}

const Game = () => {
    const [nextPlayer, setNextPlayer] = useState('X');
    const [isGameOver, setGameOver] = useState(false);
    const [status, setStatus] = useState('Следующий игрок: ' + (nextPlayer === 'X' ? 'X' : 'O'));
    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleClick = (i) => {
        let current = squares.slice();
        
        if (isGameOver || current[i]) {
            return;
        } else {
            setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
            current[i] = nextPlayer;
            setSquares(current);
        }
    }
    
    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    useEffect(() => {
        const winner = calculateWinner(squares);
        if (winner) {
            setStatus('Выиграл: ' + winner);
            setGameOver(true);
        } else {
            setStatus('Следующий игрок: ' + (nextPlayer === 'X' ? 'X' : 'O'));
        }
    }, [status, nextPlayer, squares])

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={squares} onClick={handleClick}/>
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                {/* <ol>{getSteps()}</ol> */}
            </div>
        </div>
    )
}



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);