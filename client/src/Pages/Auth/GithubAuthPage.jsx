import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { githubSignInStart } from "../../store/user/userActions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function GithubAuthPage() {
  const is_fetching = useSelector(state => state.user.fetching)
  const user = useSelector(state => state.user.currentUser)
  const query = useQuery();
  const code = query.get("code");
  const dispatch = useDispatch();

  useEffect(() => {
    if(!is_fetching && !user)dispatch(githubSignInStart(code));
    

  }, [code, dispatch,is_fetching,user]);
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
