import Cell from './Cell';

const CellComponent = (props, i, cellIdModifier) => {
    return (
        <Cell
            state={props.state}
            setState={props.setState}
            getDefaultHighlighted={props.getDefaultHighlighted}
            key={props.lineId * 10 + i}
            cellKey={props.lineId * 10 + i}
            cellId={i + cellIdModifier}
            sideLength={props.sideLength}
        />
    );
};

const Line = (props) => {
    const cellIdModifier = props.lineId % 2 === 0 ? 0 : 1;
    const cellsToFill = [...Array(8).keys()];

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {cellsToFill.map((i) => {
                return CellComponent(props, i, cellIdModifier);
            })}
        </div>
    );
};

export default Line;
