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
      {children}
    </button>
  );
}
