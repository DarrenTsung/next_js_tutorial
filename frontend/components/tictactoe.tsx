import React, { FunctionComponent } from 'react'
import styles from './tictactoe.module.css'

type SquareProps = {
    value?: string
    onClick: (e: React.MouseEvent) => void,
}

const Square: FunctionComponent<SquareProps> = ({ value, onClick }) =>
    <button className={styles.square} onClick={onClick}>
        {value}
    </button>

type BoardProps = {
    squares: Array<string>,
    onClick: (i: number) => void,
}

class Board extends React.Component<BoardProps> {
    renderSquare(i: number) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div>
                <div className={styles.boardRow}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className={styles.boardRow}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className={styles.boardRow}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

type BoardState = {
    squares: Array<string>,
}

type GameState = {
    history: BoardState[],
    xPlayersTurn: boolean,
}

export class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            xPlayersTurn: true,
        }
    }

    currentBoardState(): BoardState {
        return this.state.history[this.state.history.length - 1];
    }

    handleClick(i: number) {
        const current = this.currentBoardState();
        if (calculateWinner(current.squares) || current.squares[i]) {
            return;
        }

        const nextSquares = current.squares.slice();
        nextSquares[i] = this.state.xPlayersTurn ? 'X' : 'O';
        this.setState({
            history: this.state.history.concat({ squares: nextSquares }),
            xPlayersTurn: !this.state.xPlayersTurn,
        });
    }

    jumpTo(move: number) {
        this.setState({
            history: this.state.history.slice(0, move + 1),
            xPlayersTurn: move % 2 === 0 ? true : false,
        });
    }

    render() {
        const current = this.currentBoardState();
        const winner = calculateWinner(current.squares);
        let status: string;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xPlayersTurn ? 'X' : 'O');
        };

        const moves = this.state.history.map((step, move) => {
            const desc = move === 0 ? 'Go to game start' : 'Go to move #' + move;
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        return (
            <div className={styles.game}>
                <div className={styles.gameBoard}>
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className={styles.gameInfo}>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares: string[]): string | null {
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