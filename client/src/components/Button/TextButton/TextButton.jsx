import React from "react";
const classNames = require("classnames");

export default function TextButton({
  type,
  children,
  onClick,
  rounded,
  bcBlue,
  cBlue,
  style,
}) {
  const textButtonClasses = classNames({
    "text-button": true,
    rounded,
    bcBlue,
    cBlue,
  });
  return (
    <button
      type={type}
      onClick={onClick}
      className={textButtonClasses}
      style={style}
    >
      {children}
    </button>
  );
}
