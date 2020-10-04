import React from 'react'
import styles from './tictactoe.module.css'

class Square extends React.Component {
    render() {
        return (
            <button className={styles.square}>
                {/* TODO */}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
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