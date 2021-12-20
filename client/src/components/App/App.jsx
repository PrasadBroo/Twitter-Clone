import "../../sass/main.scss";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./../../Pages/Auth/LoginPage";
import GoogleAuthPage from "../../Pages/Auth/GoogleAuthPage";
import GithubAuthPage from "./../../Pages/Auth/GithubAuthPage";
import RequireAuth from "../RequireAuth/RequireAuth";
import SignupFlowPage from "../../Pages/Auth/SignupFlowPage";
import NotRequireAuth from "../NotRequireAuth/NotRequireAuth";
import { useEffect } from "react";
import { signInStart } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { selectFetching } from "../../store/user/userSelector";
import DefaultLoading from "../DefaultLoading/DefaultLoading";

function App() {
  const state = useSelector(state => state)
  const is_fetching = selectFetching(state);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(signInStart())
  },[dispatch])

  return (
    !is_fetching ?
    (<div className="App">
      <Routes>
        <Route element={<NotRequireAuth />}>
          <Route path="/" element={<LoginPage />}>
            <Route path="flow/signup" element={<SignupFlowPage />} />
          </Route>
          <Route path="/authenticate/google" element={<GoogleAuthPage />} />
          <Route path="/authenticate/github" element={<GithubAuthPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<h1>Homepage</h1>} />
        </Route>
      </Routes>
    </div>)
    :
    (<DefaultLoading/>)
  );
}

export default App;
