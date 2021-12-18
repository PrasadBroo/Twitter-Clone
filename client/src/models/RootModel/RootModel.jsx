import React from "react";
import RootModelHeader from "./RootModelHeader";

export default function RootModel({ children }) {
  return (
    <div className="root-model-wrap">
      <div className="root-model">
        <RootModelHeader />
        {children}
      </div>
    </div>
  );
}
