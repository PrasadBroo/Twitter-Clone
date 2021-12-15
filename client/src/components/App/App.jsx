import "../../sass/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./../../Pages/Auth/LoginPage";
import GoogleAuthPage from "../../Pages/Auth/GoogleAuthPage";
import RequireAuth from "../RequireAuth/RequireAuth";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/authenticate/google" element={<GoogleAuthPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<h1>Homepage</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
