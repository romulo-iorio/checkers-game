import { useState } from 'react';
import Board from '../components/Board';
import Score from '../components/Score';
import Title from '../components/Title';
import { backgroundStyle } from '../styles/styles.module.css';

const getDefaultHighlighted = () => {
    return [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
};

const getInitialCells = () => {
    return [
        [null, 1, null, 1, null, 1, null, 1],
        [1, null, 1, null, 1, null, 1, null],
        [null, 1, null, 1, null, 1, null, 1],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [0, null, 0, null, 0, null, 0, null],
        [null, 0, null, 0, null, 0, null, 0],
        [0, null, 0, null, 0, null, 0, null],
    ];
};

const getFirstPlayer = () => {
    return `${Math.random() > 0.5 ? 'White' : 'Black'}`;
};

const getInitialStates = () => {
    return {
        cells: Array.from(getInitialCells()),
        round: 0,
        actualPlayer: getFirstPlayer(),
        selectedCell: null,
        highlighted: Array.from(getDefaultHighlighted()),
        whiteScore: 0,
        blackScore: 0,
        gameEnded: false,
        winner: null,
    };
};

const ChessBoard = () => {
    const [state, setState] = useState(getInitialStates());

    return (
        <div
            className={backgroundStyle}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}
        >
            <Title state={state} />
            <Board
                state={state}
                setState={setState}
                getDefaultHighlighted={getDefaultHighlighted}
            />
            <Score state={state} />
        </div>
    );
};

export default ChessBoard;
