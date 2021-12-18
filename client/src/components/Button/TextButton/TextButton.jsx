import React from "react";
import SimpleSpinner from "../../Loader/SimpleSpinner";
const classNames = require("classnames");

export default function TextButton({
  loading,
  type,
  children,
  onClick,
  rounded,
  bcBlue,
  cBlue,
  style,
  className,
  ...otherProps
}) {
  const textButtonClasses = classNames({
    "text-button": true,
    rounded,
    bcBlue,
    cBlue,
  },className);
  return (
    <button
      type={type}
      onClick={onClick}
      className={textButtonClasses}
      style={style}
      {...otherProps}
    >
      {loading ? <SimpleSpinner/> : children}
    </button>
  );
}
