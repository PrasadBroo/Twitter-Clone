import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { googleAuthentication } from "../../services/authenticationServices";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function GoogleAuthPage() {
  const query = useQuery();
  const code = query.get("code");

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await googleAuthentication(code);
        console.log(user);
        // dispatch user action
      } catch (error) {
        console.log(error);
        // dispatch error action
      }
    }
    fetchData()

    console.log(code);
  }, [code]);
  return (
    <div>
      <h1>Redirecting...</h1>
      {code}
    </div>
  );
}
