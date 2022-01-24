import React from "react";
import { useNavigate } from "react-router-dom";

export default function RootModelHeader({ hideHeader }) {
  const navigate = useNavigate();
  const handelModelClose = () => {
    navigate("/home");
  };
  return (
    <div className="root-model-header">
      <div className="model-close-btn" onClick={handelModelClose}>
        <i className="fas fa-times"></i>
      </div>
      
      {!hideHeader &&<>
        <div className="root-model-header-icon-container default-logo">
          <i className="fab fa-twitter logo"></i>
        </div>
        <div className="root-model-header-useless-div "></div>
      </>}
    </div>
  );
}
