import React from "react";
import { useEffect } from "react";
import {  useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignInStart } from "../../store/user/userActions";




export default function GoogleAuthPage() {
  const error = useSelector(state => state.user.signInFail)
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(googleSignInStart(code));
  }, [code, dispatch]);
  return (
    <div>
      {!error && <h1>Redirecting...</h1>}
      {error && <h2>{error}</h2>}
    </div>
  );
}
