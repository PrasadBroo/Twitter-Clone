import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/userSelector";
export default function NotRequireAuth() {
  const state = useSelector((state) => state);
  let auth = { user: selectCurrentUser(state) };
  let location = useLocation();
  if (auth.user) {
    // Redirect them to the /home page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={location.state ? location.state.from:'/home'}  state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
