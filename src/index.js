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
    // const [squares, setSquares] = useState(Array(9).fill(null));
    const [status, setStatus] = useState('Следующий игрок: ' + (nextPlayer === 'X' ? 'X' : 'O'));
    const [history, setHistory] = useState( [{squares: Array(9).fill(null)}] );
    // let steps = history.map((step, val) => {
    //     let text = (val ? 'Вернуться к шагу' + step : 'Начать заново');
    //     return (
    //         <li>
    //             <button>{text}</button>
    //         </li>
    //     )
    // })

    const handleClick = (i) => {
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (isGameOver || squares[i]) {
            return;
        }
        else {
            setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
            squares[i] = nextPlayer;
            // setHistory(history.push(squares));
            setHistory(history.push({squares: squares}))
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

    // const renderSteps = () => {
    //     let lis = [<li><button>{'Вернуться к шагу' + history.length}</button></li>];
    //     // let ol = <ol>{lis}</ol>;
    //     for (let i = 0; i <= history.length; i++) {
    //         if (i !== 0) {
    //             lis.push(<li><button>{'Вернуться к шагу' + history.length}</button></li>)
    //         }
    //     }
    //     return lis.join('');
    // }

    // useEffect(() => {
    //     let step = history.length;
    //     let stepInner = (history.length !== 1 ? 'Вернуться к шагу' + step : 'Начать заново')
    //     let stepsCopy = steps.slice().push(<li><button>{stepInner}</button></li>);
    //     setSteps(stepsCopy)
    // }, [history.length, steps])

    useEffect(() => {
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        if (winner) {
            setStatus('Выиграл: ' + winner);
            setGameOver(true);
        } else {
            setStatus('Следующий игрок: ' + (nextPlayer === 'X' ? 'X' : 'O'));
        }
    }, [status, nextPlayer, history])

    useEffect(() => {
        console.log(history[history.length - 1].squares);
    })
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={history[history.length-1].squares} onClick={() => handleClick}/>
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                {/* <ul>{steps}</ul> */}
            </div>
        </div>
    )
}



ReactDOM.render(
    <Game />,
    document.getElementById('root')
);