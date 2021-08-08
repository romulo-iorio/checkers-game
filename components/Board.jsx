import Line from './Line';
import { boardStyle } from '../styles/styles.module.css';

const LineComponent = (props, i) => {
    const sideLength = '50px';

    return (
        <Line
            state={props.state}
            setState={props.setState}
            getDefaultHighlighted={props.getDefaultHighlighted}
            key={i}
            lineId={i}
            sideLength={sideLength}
        />
    );
};

const Board = (props) => {
    const lines = [...Array(8).keys()];

    return (
        <div className={boardStyle}>
            {lines.map((i) => {
                return LineComponent(props, i);
            })}
        </div>
    );
};

export default Board;
