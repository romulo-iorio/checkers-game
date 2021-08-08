import { useState } from 'react';
import relativeStyles from './stoneStyles';
import { stoneStyle, holeStyle, hoverStyle } from './stoneStyles.module.css';

const canClick = ({ state, color }) => {
    return state.actualPlayer === color;
};

const getModifiers = (dec) => {
    const binary = dec.toString(2).length > 1 ? dec.toString(2) : `0${dec}`;
    const i = binary.split('')[0] === '0' ? -1 : 1;
    const j = binary.split('')[1] === '0' ? -1 : 1;
    return [i, j];
};

const getDiagonalCells = (props) => {
    const row = parseInt(props.row);
    const column = parseInt(props.column);

    return new Array(4).fill(0).map((v, index) => {
        const [i, j] = getModifiers(index);
        return { row: row + i, column: column + j, type: `${i}/${j}` };
    });
};

const highlightOverEnemyCell = (params) => {
    const { cellRow, cellColumn, type, highlighted, state, isCellValid } =
        params;
    const [i, j] = type.split('/');
    const furtherRow = cellRow + parseInt(i);
    const furtherColumn = cellColumn + parseInt(j);
    if (isCellValid(furtherRow, furtherColumn)) {
        const furtherCell = state.cells[furtherRow][furtherColumn];
        if (furtherCell === null) {
            highlighted[furtherRow][furtherColumn] = true;
        }
    }
};

const getMovesToHighlight = (props) => {
    const { row, column, state, cellValue, isEnemyCell, isCellValid } = props;
    const diagonalCells = getDiagonalCells({ row, column });

    const highlighted = Array.from(state.highlighted);

    for (const diagonalCell of diagonalCells) {
        const { row: cellRow, column: cellColumn, type } = diagonalCell;
        if (isCellValid(cellRow, cellColumn)) {
            const cell = state.cells[cellRow][cellColumn];

            if (cell === null) {
                highlighted[cellRow][cellColumn] = true;
            } else if (isEnemyCell(cell, cellValue)) {
                const params = {
                    cellRow,
                    cellColumn,
                    type,
                    highlighted,
                    state,
                    isCellValid,
                };
                highlightOverEnemyCell(params);
            }
        }
    }

    return highlighted;
};

const hasSelectedCell = (props, stoneState, setStoneState) => {
    const { row, column, state } = props;
    const thisCell = { row, column };

    if (JSON.stringify(thisCell) === JSON.stringify(state.selectedCell)) {
        resetSelectedCell(props, stoneState, setStoneState);
    } else {
        alert(
            'Player already has selected a stone, unselected it to select another one'
        );
    }
};

const resetSelectedCell = (props, stoneState, setStoneState) => {
    const { state, setState, getDefaultHighlighted } = props;
    setStoneState({
        ...stoneState,
        clicked: false,
    });
    const newStates = {
        ...state,
        selectedCell: null,
        highlighted: getDefaultHighlighted(),
    };
    setState({ ...newStates });
};

const playerTurn = (props, stoneState, setStoneState) => {
    const { row, column, state, setState } = props;

    if (!state.selectedCell) {
        setStoneState({
            ...stoneState,
            clicked: true,
        });
        const newStates = {
            ...state,
            selectedCell: { row, column },
            highlighted: Array.from(getMovesToHighlight(props)),
        };
        setState({ ...newStates });
    } else {
        hasSelectedCell(props, stoneState, setStoneState);
    }
};

const handleClick = (props, stoneState, setStoneState) => {
    if (!canClick(props)) {
        alert("It's not your turn!");
    } else {
        playerTurn(props, stoneState, setStoneState);
    }
};

const handleMouseEnter = (stoneState, setStoneState) => {
    setStoneState({
        ...stoneState,
        mouseOver: true,
    });
};

const handleMouseLeave = (stoneState, setStoneState) => {
    setStoneState({
        ...stoneState,
        mouseOver: false,
    });
};

const Stone = (props) => {
    const [stoneState, setStoneState] = useState({
        clicked: false,
        mouseOver: false,
    });
    const { clicked, mouseOver } = stoneState;
    const { selectedCell } = props.state;
    const stoneClassNames = `${stoneStyle} ${
        (clicked && selectedCell) || (mouseOver && canClick(props))
            ? hoverStyle
            : ''
    }`;

    return (
        <div
            className={stoneClassNames}
            style={relativeStyles.getStoneStyle(props, canClick(props))}
            onClick={() => handleClick(props, stoneState, setStoneState)}
            onMouseEnter={() => handleMouseEnter(stoneState, setStoneState)}
            onMouseLeave={() => handleMouseLeave(stoneState, setStoneState)}
        >
            <div
                className={holeStyle}
                style={relativeStyles.getHoleStyle(props)}
            ></div>
        </div>
    );
};

export default Stone;
