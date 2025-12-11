import { ToastContainer } from "react-toastify";
import "./App.css";
import { MainRoute } from "./routes/MainRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <MainRoute />
    </>
  );
}

export default App;
