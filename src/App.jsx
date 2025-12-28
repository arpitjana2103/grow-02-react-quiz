import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const URL = `http://localhost:9456/questions`;
const STATUS = {
    loading: "loading",
    error: "error",
    ready: "ready",
    active: "active",
    finished: "finished",
};

const initialState = {
    questions: [],
    status: STATUS.loading,
    c_qIndex: 0, // currentQuestionIndex
    s_oIndex: null, // selectedOptionIndex
    points: 0,
};

function reducer(c_state, action) {
    switch (action.type) {
        case "data-received": {
            return {
                ...c_state,
                questions: action.payload,
                status: STATUS.ready,
            };
        }
        case "data-failed": {
            return {
                ...c_state,
                status: STATUS.error,
            };
        }
        case "start": {
            return {
                ...c_state,
                status: STATUS.active,
            };
        }
        case "select-option": {
            const c_question = c_state.questions.at(c_state.c_qIndex);
            const r_oIndex = c_question.correctOption;
            const s_oIndex = action.payload;
            const points = c_question.points;
            return {
                ...c_state,
                s_oIndex: s_oIndex,
                points:
                    s_oIndex === r_oIndex
                        ? c_state.points + points
                        : c_state.points,
            };
        }
        case "next-question": {
            return {
                ...c_state,
                s_oIndex: null,
                c_qIndex:
                    c_state.c_qIndex < c_state.questions.length - 1
                        ? c_state.c_qIndex + 1
                        : c_state.c_qIndex,
            };
        }
        default:
            throw new Error("Action Unkown");
    }
}

function App() {
    const [{ questions, status, c_qIndex, s_oIndex, points }, dispatch] =
        useReducer(reducer, initialState);
    const hasAnswered = s_oIndex !== null;
    const numQuestions = questions.length;
    const maxPoints = questions.reduce((acc, q) => acc + q.points, 0);
    console.log(maxPoints);

    useEffect(function () {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => dispatch({ type: "data-received", payload: data }))
            .catch((err) => dispatch({ type: "data-failed" }));
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === STATUS.loading && <Loader />}
                {status === STATUS.error && <Error />}
                {status === STATUS.ready && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === STATUS.active && (
                    <>
                        <Progress
                            numQuestions={numQuestions}
                            c_qIndex={c_qIndex}
                            points={points}
                            maxPoints={maxPoints}
                            hasAnswered={hasAnswered}
                        />
                        <Question
                            question={questions[c_qIndex]}
                            s_oIndex={s_oIndex}
                            dispatch={dispatch}
                        />
                    </>
                )}
                {hasAnswered && <NextButton dispatch={dispatch} />}
            </Main>
        </div>
    );
}

export default App;
