import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

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
};

function reducer(c_state, action) {
    switch (action.type) {
        case "data-received":
            return {
                ...c_state,
                questions: action.payload,
                status: STATUS.ready,
            };
        case "data-failed":
            return {
                ...c_state,
                status: STATUS.error,
            };
        case "start":
            return {
                ...c_state,
                status: STATUS.active,
            };
        default:
            throw new Error("Action Unkown");
    }
}

function App() {
    const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;

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
                {status === STATUS.active && <Questions />}
            </Main>
        </div>
    );
}

export default App;
