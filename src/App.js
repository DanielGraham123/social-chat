import { useRoutes } from "react-router-dom";
import "./App.css"
import { routes } from "./routes/index.js";

function App() {
  const routing = useRoutes(routes)

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>

      {routing}
    </div>
  );
}

export default App;
