const Score = ({ state }) => {
    return (
        <div
            style={{
                color: 'white',
                margin: '5px auto 5px auto',
                textAlign: 'center',
            }}
        >
            <h1>Score</h1>
            <div
                style={{
                    display: 'flex',
                    width: '250px',
                    justifyContent: 'space-around',
                }}
            >
                <div>
                    <h2>White: {`${state.whiteScore}`}</h2>
                </div>
                <div>
                    <h2>Black: {`${state.blackScore}`}</h2>
                </div>
            </div>
        </div>
    );
};

export default Score;
