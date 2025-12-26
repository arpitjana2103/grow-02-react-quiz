import reactDom from "react-dom/client";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root");
const root = reactDom.createRoot(rootEl);
root.render(<App />);
