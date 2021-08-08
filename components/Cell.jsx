import CellHighlighting from './CellHighlighting';
import Stone from './Stone';

const getKeyString = (key) => {
    const keyString = `${key}`;

    if (keyString.length === 1) {
        return `0${keyString}`;
    } else {
        return keyString;
    }
};

const getRowAndColumn = (key) => {
    const keyString = getKeyString(key);

    const row = keyString.split('')[0];
    const column = keyString.split('')[1];

    return { row, column };
};

const getCellColor = (props) => {
    const { row, column } = getRowAndColumn(props.cellKey);

    const cell = props.state.cells[row][column];
    if (cell === 0) {
        return 'Black';
    } else if (cell === 1) {
        return 'White';
    }
};

const canMoveToCell = (props) => {
    const { row, column } = getRowAndColumn(props.cellKey);
    return props.state.highlighted[row][column];
};

const getCellStyle = (props) => {
    const backgroundColor = props.cellId % 2 === 0 ? '#fff' : '#000';
    return {
        backgroundColor,
        width: props.sideLength,
        height: props.sideLength,
        display: 'flex',
        position: 'relative',
    };
};

const isEnemyCell = (cell, cellValue) => {
    return cell === !cellValue + 0;
};

const isCellValid = (row, column) => {
    return row >= 0 && row <= 7 && column >= 0 && column <= 7;
};

const StoneComponent = (props) => {
    const { row, column } = getRowAndColumn(props.cellKey);
    const cellColor = getCellColor(props);

    return (
        <Stone
            state={props.state}
            setState={props.setState}
            isEnemyCell={isEnemyCell}
            isCellValid={isCellValid}
            cellValue={getCellValueByActualPlayer(props.state)}
            getDefaultHighlighted={props.getDefaultHighlighted}
            row={row}
            column={column}
            color={cellColor}
        />
    );
};

const CellHighlightingComponent = (props) => {
    const { row, column } = getRowAndColumn(props.cellKey);
    const cellColor = getCellColor(props);

    return (
        <CellHighlighting
            state={props.state}
            setState={props.setState}
            isEnemyCell={isEnemyCell}
            isCellValid={isCellValid}
            cellValue={getCellValueByActualPlayer(props.state)}
            getDefaultHighlighted={props.getDefaultHighlighted}
            row={row}
            column={column}
            color={cellColor}
        />
    );
};

const getCellValueByActualPlayer = (state) => {
    const { actualPlayer } = state;
    return actualPlayer === 'Black' ? 0 : 1;
};

const hasStone = (props) => {
    const { row, column } = getRowAndColumn(props.cellKey);
    const cell = props.state.cells[row][column];

    return cell !== null;
};

const Cell = (props) => {
    return (
        <div style={getCellStyle(props)}>
            {canMoveToCell(props) ? CellHighlightingComponent(props) : ''}
            {hasStone(props) ? StoneComponent(props) : ''}
        </div>
    );
};

export default Cell;
