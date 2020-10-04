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

type BoardState = {
    squares: Array<string>,
    xPlayersTurn: boolean,
}

class Board extends React.Component<{}, BoardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xPlayersTurn: true,
        };
    }

    handleClick(i: number) {
        if (calculateWinner(this.state.squares) || this.state.squares[i]) {
            return;
        }

        const squares = this.state.squares.slice();
        squares[i] = this.state.xPlayersTurn ? 'X' : 'O';
        this.setState({
            squares: squares,
            xPlayersTurn: !this.state.xPlayersTurn
        });
    }

    renderSquare(i: number) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status: string;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xPlayersTurn ? 'X' : 'O');
        };

        return (
            <div>
                <div className={styles.status}>{status}</div>
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

export class Game extends React.Component {
    render() {
        return (
            <div className={styles.game}>
                <div className={styles.gameBoard}>
                    <Board />
                </div>
                <div className={styles.gameInfo}>
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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