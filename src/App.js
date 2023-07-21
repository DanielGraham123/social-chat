import { useRoutes } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/index.js";

const App = () => {

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>

      <AppRoutes />
    </div>
  );
}

export default App;
