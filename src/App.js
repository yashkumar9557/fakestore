import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes";
import { Notification } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Notification />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
