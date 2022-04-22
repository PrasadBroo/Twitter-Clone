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
import BookmarksPage from "../../Pages/BookmarksPage";
import ExplorePage from "./../../Pages/ExplorePage";
import TweetSections from "../Tweet/TweetSections";
import User from "../User/User";
import UserTweets from "../User/UserTweets";
import FollowPage from "./../../Pages/FollowPage";
import Following from "../Followings/Following";
import Followers from "../Followers/Followers";
import NotificationsPage from "./../../Pages/NotificationsPage";
import SettingsPage from "./../../Pages/SettingsPage";
import EditProfile from "../User/EditProfile";
import LikedTweets from "../Tweet/LikedTweets";
import MediaTweets from "../Tweet/MediaTweets";
import ComposeTweetPage from "./../../Pages/ComposeTweetPage";
import Tweetpage from "../../Pages/Tweetpage";

function App() {
  const state = useSelector((state) => state);
  const is_fetching = selectFetching(state);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) dispatch(signInStart());
  }, [dispatch, token]);

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
          <Route path="compose/tweet" element={<HomepageLayout />}>
            <Route index element={<ComposeTweetPage />} />
          </Route>
          <Route path="home" element={<HomepageLayout />}>
            <Route index element={<TweetSections />} />
          </Route>
          <Route path="/:username/*" element={<HomepageLayout />}>
            <Route path="status/:tweetid" element={<Tweetpage />} />
            <Route path="*" element={<User />}>
              <Route index element={<UserTweets />} />
              <Route path="tweets" element={<UserTweets />} />
              <Route path="likes" element={<LikedTweets />} />
              <Route path="media" element={<MediaTweets />} />
              <Route path="with_replies" element={<h1>Coming Soon</h1>} />
              <Route path="edit/profile" element={<EditProfile />} />
            </Route>
          </Route>
          <Route path="explore" element={<HomepageLayout />}>
            <Route index element={<ExplorePage />} />
          </Route>
          <Route path="bookmarks" element={<HomepageLayout />}>
            <Route index element={<BookmarksPage />} />
          </Route>
          <Route path="notifications" element={<HomepageLayout />}>
            <Route element={<NotificationsPage />}>
              <Route index element={<h1>All</h1>} />
              <Route path="mentions" element={<h1>Mentions</h1>} />
            </Route>
          </Route>
          <Route path="/:username/*" element={<HomepageLayout />}>
            <Route element={<FollowPage />}>
              <Route path="following" element={<Following />} />
              <Route path="followers" element={<Followers />} />
            </Route>
          </Route>
          <Route path="settings" element={<HomepageLayout />}>
            <Route element={<SettingsPage />}>
              <Route index element={<h1>Index</h1>} />
              <Route path="account" element={<h1>Your Acoount</h1>} />
              <Route
                path="privacy_and_safety"
                element={<h1>Privacy and Safety</h1>}
              />
              <Route path="notifications" element={<h1>Notifications</h1>} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </div>
  ) : (
    <DefaultLoading />
  );
}

export default App;
