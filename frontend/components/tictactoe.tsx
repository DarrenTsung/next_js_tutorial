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
}

class Board extends React.Component<{}, BoardState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i: number) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({ squares: squares });
    }

    renderSquare(i: number) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {
        const status = 'Next player: X';

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