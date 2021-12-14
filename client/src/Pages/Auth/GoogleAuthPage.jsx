import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function GoogleAuthPage() {
    const query = useQuery();
    const code = query.get('code');

    useEffect(()=>{
        console.log(code)
    },[code])
  return (
    <div>
      <h1>Redirecting...</h1>
      {code}
    </div>
  );
}

