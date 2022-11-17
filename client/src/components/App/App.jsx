import "../../sass/main.scss";
import React,{ Suspense,lazy, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import RequireAuth from "../RequireAuth/RequireAuth";
import SignupFlowPage from "../../Pages/Auth/SignupFlowPage";
import NotRequireAuth from "../NotRequireAuth/NotRequireAuth";
import { signInStart } from "../../store/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import { selectFetching } from "../../store/user/userSelector";
import DefaultLoading from "../DefaultLoading/DefaultLoading";
import LoginFlowPage from "../../Pages/Auth/LoginFlowPage";

import BookmarksPage from "../../Pages/BookmarksPage";
import ExplorePage from "./../../Pages/ExplorePage";
import TweetSections from "../Tweet/TweetSections";
import User from "../User/User";
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
import ExploreForYou from "../../subcomponents/ExploreForYou";
import SearchPage from "../../Pages/SearchPage";
import EmailVerificationPage from "../../Pages/Auth/EmailVerificationPage";
import Tweets from "../Tweet/Tweets";
import Mentions from "../Notification/Mentions";
import All from "../Notification/All";
import ExploreCovid20 from './../../subcomponents/ExploreCovid20';
import ExploreTrending from './../../subcomponents/ExploreTrending';
import ExploreNews from './../../subcomponents/ExploreNews';
import ExploreSports from './../../subcomponents/ExploreSports';
import ExploreEntertainment from './../../subcomponents/ExploreEntertainment';
import { QueryClientProvider,QueryClient } from "react-query";
import { setupInterceptors } from "../../services/axios";


const LoginPage = lazy(() => import('./../../Pages/Auth/LoginPage'));
const HomepageLayout =  lazy(() => import("../../Pages/HomepageLayout"));
const GoogleAuthPage =  lazy(() => import( "../../Pages/Auth/GoogleAuthPage"));
const GithubAuthPage = lazy(() => import( "./../../Pages/Auth/GithubAuthPage"));
const queryClient = new QueryClient()

function App() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const is_fetching = selectFetching(state);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) dispatch(signInStart());
  }, [dispatch, token]);

  useEffect(()=>{
    setupInterceptors(navigate,dispatch)
  },[navigate,dispatch])

  if(is_fetching)return <DefaultLoading/>
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
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
            <Route path="" element={<User />}>
              <Route index element={<Tweets />} />
              <Route path="tweets" element={<Tweets />} />
              <Route path="likes" element={<LikedTweets />} />
              <Route path="media" element={<MediaTweets />} />
              <Route path="with_replies" element={<h1>Coming Soon</h1>} />
              <Route path="edit/profile" element={<EditProfile />} />
            </Route>
          </Route>
          <Route path="explore/*" element={<HomepageLayout />}>
            <Route path="" element={<ExplorePage />}>
              <Route index element={<ExploreForYou />} />
              <Route path="for-you" element={<ExploreForYou />} />
              <Route path="covid20" element={<ExploreCovid20 />} />
              <Route path="trending" element={<ExploreTrending />} />
              <Route path="news" element={<ExploreNews />} />
              <Route path="sports" element={<ExploreSports />} />
              <Route path="entertainment" element={<ExploreEntertainment />} />
            </Route>
          </Route>
          <Route path="search/*" element={<HomepageLayout />}>
            <Route index element={<SearchPage />}></Route>
          </Route>
          <Route path="bookmarks" element={<HomepageLayout />}>
            <Route index element={<BookmarksPage />} />
          </Route>
          <Route path="messages" element={<HomepageLayout />}>
            <Route index element={<h2>Messages</h2>} />
          </Route>
          <Route path="notifications" element={<HomepageLayout />}>
            <Route element={<NotificationsPage />}>
              <Route index element={<All/>} />
              <Route path="" element={<All />} />
              <Route path="mentions" element={<Mentions />} />
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
          <Route path="confirm/:verificationtoken" element={<EmailVerificationPage/>}/>
        </Route>
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
      </Suspense>
      
    </div>
    </QueryClientProvider>
    
  )
}

export default App;
