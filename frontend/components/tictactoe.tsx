import React, { FunctionComponent } from 'react'
import styles from './tictactoe.module.css'

type SquareProps = {
    value: number
}

type SquareState = {
    value?: string
}

class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        return <button className={styles.square} onClick={() => this.setState({ value: 'X' })}>
            {this.state.value}
        </button>
    }
}

class Board extends React.Component {
    renderSquare(i: number) {
        return <Square value={i} />;
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