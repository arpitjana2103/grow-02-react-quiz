function Progress({ c_qIndex, numQuestions, points, maxPoints, hasAnswered }) {
    return (
        <header className="progress">
            <progress
                max={numQuestions}
                value={c_qIndex + Number(hasAnswered)}
            />
            <p>
                Question <strong>{c_qIndex + 1}</strong> / {numQuestions}
            </p>

            <p>
                <strong>{points}</strong> / {maxPoints}
            </p>
        </header>
    );
}

export default Progress;
