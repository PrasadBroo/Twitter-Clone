import React from "react";
import Signup from "../../components/Signup/Signup";
import RootModel from "../../models/RootModel/RootModel";

export default function SignupFlowPage() {
  return (
    <div className="signup-flow-page">
      <RootModel>
        <Signup />
      </RootModel>
    </div>
  );
}
