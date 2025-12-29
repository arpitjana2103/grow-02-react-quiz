import { useEffect } from "react";

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");

    return `${mm}:${ss}`;
}

function Timer({ remainingSeconds, dispatch }) {
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
    return <div className="timer">{formatTime(remainingSeconds)}</div>;
}

export default Timer;
