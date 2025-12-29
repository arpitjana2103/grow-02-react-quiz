import { useEffect } from "react";

function Timer({ remainingSeconds, dispatch }) {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    useEffect(
        function () {
            const id = setInterval(function () {
                dispatch({ type: "tick" });
            }, 1000);
            return function () {
                clearInterval(id);
            };
        },
        [dispatch]
    );
    return (
        <div className="timer">
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
        </div>
    );
}

export default Timer;
