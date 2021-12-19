import { useSelector } from "react-redux";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/userSelector";
export default function RequireAuth() {
  const state = useSelector((state)=>state)
  console.log(selectCurrentUser(state))
  let auth = {user:selectCurrentUser(state)};
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location.pathname }} />;
  }

  return <Outlet />
}
