import ReactDOM from "react-dom/client";
import "./index.css";
import App3 from "./example2/App3";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App3 />
  // <React.StrictMode> is disabled because it causes double useEffects when using redux-toolkit
);
