function FinishScreen({ points, maxPoints, highscore }) {
    const percentage = (points / maxPoints) * 100;

    return (
        <div>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPoints} (
                {Math.ceil(percentage)} %)
            </p>
            <p className="highscore">
                ( Your current HighScore : {highscore} )
            </p>
        </div>
    );
}

export default FinishScreen;
