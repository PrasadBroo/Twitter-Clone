import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { githubSignInStart } from "../../store/user/userActions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function GithubAuthPage() {
  const query = useQuery();
  const code = query.get("code");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(githubSignInStart(code));

    console.log(code);
  }, [code, dispatch]);
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
}
