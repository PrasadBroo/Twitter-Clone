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
import LoginFlowPage from "../../Pages/Auth/LoginFlowPage";
import HomepageLayout from "../../Pages/HomepageLayout";
import ComposeTweetPage from "../../Pages/ComposeTweetPage";
import BookmarksPage from "../../Pages/BookmarksPage";
import ExplorePage from "./../../Pages/ExplorePage";
import TweetSections from "../Tweet/TweetSections";
import User from "../User/User";
import UserTweets from "../User/UserTweets";


function App() {
  const state = useSelector((state) => state);
  const is_fetching = selectFetching(state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signInStart());
  }, [dispatch]);

  return !is_fetching ? (
    <div className="App">
      <Routes>
        <Route element={<NotRequireAuth />}>
          <Route path="/" element={<LoginPage />}>
            <Route path="flow/signup" element={<SignupFlowPage />} />
            <Route path="flow/login" element={<LoginFlowPage />} />
          </Route>
          <Route path="/authenticate/google" element={<GoogleAuthPage />} />
          <Route path="/authenticate/github" element={<GithubAuthPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomepageLayout />}>
            <Route path="/:username/*" element={<User />}>
              <Route index element={<UserTweets />} />
              <Route path="tweets" element={<UserTweets />} />
            </Route>
            <Route index element={<TweetSections />} />
            <Route path="home" element={<TweetSections />}>
              <Route path="compose/tweet" element={<ComposeTweetPage />} />
            </Route>
            <Route path="explore" element={<ExplorePage />} />
            <Route path="bookmarks" element={<BookmarksPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  ) : (
    <DefaultLoading />
  );
}

export default App;
