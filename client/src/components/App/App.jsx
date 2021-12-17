import "../../sass/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./../../Pages/Auth/LoginPage";
import GoogleAuthPage from "../../Pages/Auth/GoogleAuthPage";
import GithubAuthPage from "./../../Pages/Auth/GithubAuthPage";
import RequireAuth from "../RequireAuth/RequireAuth";
import SignupFlowPage from "../../Pages/Auth/SignupFlowPage";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/flow/signup" element={<SignupFlowPage />} />
        <Route path="/authenticate/google" element={<GoogleAuthPage />} />
        <Route path="/authenticate/github" element={<GithubAuthPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<h1>Homepage</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
