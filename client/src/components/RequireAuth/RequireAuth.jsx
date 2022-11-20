import { useLocation, Outlet, Navigate } from "react-router-dom";

export default function RequireAuth() {

  let user = localStorage.getItem('token');
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{from: location.pathname} } />;
  }

  return <Outlet />
}
