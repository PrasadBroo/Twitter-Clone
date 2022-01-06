import React from "react";
import Login from "../../components/Login/Login";
import RootModel from "../../models/RootModel/RootModel";

export default function LoginFlowPage() {
  return (
    <div className="login-flow-page">
      <RootModel>
          <Login/>
      </RootModel>
    </div>
  );
}
