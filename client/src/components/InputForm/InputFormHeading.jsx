import React from "react";

export default function InputFormHeading({ heading , ...otherProps}) {
  return (
    <div className="input-form-header" {...otherProps}>
      <h3 className="form-heading heading-3">{heading}</h3>
    </div>
  );
}
