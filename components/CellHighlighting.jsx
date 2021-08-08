import { cellHighlightingStyle } from './cellHighlighting.module.css';

const getDistance = (row1, col1, row2, col2) => {
    const rowsDistance = parseInt(row1) - parseInt(row2);
    const columnDistance = parseInt(col1) - parseInt(col2);
    return Math.sqrt(Math.pow(rowsDistance, 2) + Math.pow(columnDistance, 2));
};

const getNumberOfCellsBetween = (props) => {
    const { state, row: rowAfter, column: columnAfter } = props;
    const { row: rowBefore, column: columnBefore } = state.selectedCell;
    const distance = getDistance(
        rowBefore,
        columnBefore,
        rowAfter,
        columnAfter
    );

    return Math.round(distance / Math.sqrt(2)) - 1;
};

const getMovementDirection = (props) => {
    const { state, row: rowAfter, column: columnAfter } = props;
    const { row: rowBefore, column: columnBefore } = state.selectedCell;

    const rowsDistance = parseInt(rowAfter) - parseInt(rowBefore);
    const columnDistance = parseInt(columnAfter) - parseInt(columnBefore);

    const i = rowsDistance > 0 ? 1 : -1;
    const j = columnDistance > 0 ? 1 : -1;
    return { i, j };
};

const updateCellsByCapture = (cells, props) => {
    const { row: rowAfter, column: columnAfter } = props;
    const { state, isEnemyCell, cellValue, isCellValid } = props;

    const cellsBetween = getNumberOfCellsBetween(props);

    let capturedCells = 0;
    for (let c = 1; c <= cellsBetween; c++) {
        const { i, j } = getMovementDirection(props);
        const row = parseInt(rowAfter) - i;
        const column = parseInt(columnAfter) - j;

        if (isCellValid(row, column)) {
            const cell = state.cells[row][column];
            if (isEnemyCell(cell, cellValue)) {
                cells[row][column] = null;
                capturedCells++;
            }
        }
    }

    return capturedCells;
};

const updateCellsByMovement = (cells, props) => {
    const { state, row, column, cellValue } = props;
    const { row: oldRow, column: oldColumn } = state.selectedCell;
    cells[oldRow][oldColumn] = null;
    cells[row][column] = cellValue;
};

const getUpdatedCells = (props) => {
    const newCells = [...props.state.cells];

    updateCellsByMovement(newCells, props);

    const capturedCells = updateCellsByCapture(newCells, props);

    return { newCells, capturedCells };
};

const nextPlayer = (player) => {
    if (player === 'Black') {
        return 'White';
    } else {
        return 'Black';
    }
};

const getPlayerScoreName = ({ state }) => {
    const { actualPlayer } = state;
    if (actualPlayer === 'Black') {
        return 'blackScore';
    } else {
        return 'whiteScore';
    }
};

const getPlayerValue = (player) => {
    if (player === 'Black') {
        return 0;
    } else {
        return 1;
    }
};

const hasAnyEnemyCells = ({ cells, actualPlayer }) => {
    return cells
        .map((arr) => arr.some((v) => v === !getPlayerValue(actualPlayer) - 0))
        .some((v) => v === true);
};

const hasGameEnded = (state) => {
    console.log('hasAnyEnemyCells', hasAnyEnemyCells(state));
    if (hasAnyEnemyCells(state)) {
        return false;
    }
    return true;
};

const handleClick = (props) => {
    const { state, setState, getDefaultHighlighted } = props;
    const { newCells, capturedCells } = getUpdatedCells(props);
    const playerScoreName = getPlayerScoreName(props);

    const newStates = {
        ...state,
        selectedCell: null,
        highlighted: getDefaultHighlighted(),
        cells: newCells,
        selectedCell: null,
        round: state.round + 1,
        highlighted: getDefaultHighlighted(),
    };
    newStates[playerScoreName] = state[playerScoreName] + capturedCells;
    console.log('newStates', newStates);

    if (hasGameEnded(newStates)) {
        newStates.gameEnded = true;
        newStates.winner = `${state.actualPlayer}`;
    } else {
        newStates.actualPlayer = `${nextPlayer(state.actualPlayer)}`;
    }

    setState({ ...newStates });
};

const CellHighlighting = (props) => {
    return (
        <div
            onClick={() => handleClick(props)}
            className={cellHighlightingStyle}
        ></div>
    );
};

export default CellHighlighting;
