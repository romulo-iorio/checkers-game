const Title = ({ state }) => {
    const titleStyle = {
        color: 'white',
        margin: '5px auto 5px auto',
        textAlign: 'center',
    };
    return (
        <div style={titleStyle}>
            {state.gameEnded ? (
                <h1>{state.winner} wins!</h1>
            ) : (
                <h1>
                    {state.round === 0 ? 'First' : 'Actual'} player :{' '}
                    {state.actualPlayer}
                </h1>
            )}
            <h2>Rounds: {state.round}</h2>
        </div>
    );
};

export default Title;
