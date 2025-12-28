function Question({ question, s_oIndex, dispatch }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <Options
                question={question}
                s_oIndex={s_oIndex}
                dispatch={dispatch}
            />
        </div>
    );
}

function Options({ question, s_oIndex, dispatch }) {
    return (
        <div className="options">
            {question.options.map(function (option, i) {
                const isSelected = i === s_oIndex;
                const hasAnswered = s_oIndex !== null;
                const isCorrect = i === question.correctOption;

                const btnCls = [
                    "btn",
                    "btn-option",
                    isSelected && "answer",
                    hasAnswered && (isCorrect ? "right" : "wrong"),
                ]
                    .filter(Boolean)
                    .join(" ");

                return (
                    <button
                        className={btnCls}
                        onClick={() =>
                            dispatch({ type: "select-option", payload: i })
                        }
                        key={i}
                        disabled={hasAnswered}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    );
}

export default Question;
