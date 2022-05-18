import React from "react";
import {  useNavigate } from "react-router-dom";

export default function CustomSearch({q}) {
  const navigate = useNavigate();
  const handelClick = ()=>{
    navigate('/search?c=trend&q='+encodeURIComponent(q));
  }
  return (
    <div className="custom-search">
      <span className="icon-container">
        <i className="far fa-search"></i>
      </span>
      <span className="custom-search-text" onClick={handelClick} >
        {q}
      </span>
    </div>
  );
}
