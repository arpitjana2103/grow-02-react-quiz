function NextButton({ dispatch }) {
    return (
        <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "next-question" })}
        >
            Next
        </button>
    );
}

export default NextButton;
