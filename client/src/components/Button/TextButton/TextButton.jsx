import React from "react";
import SimpleSpinner from "../../Loader/SimpleSpinner";
const classNames = require("classnames");

export default function TextButton({
  disabled,
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
  const textButtonClasses = classNames('button','text-button',{
    rounded,
    bcBlue,
    cBlue,
    'btn-disabled':disabled,
    'btn-loading':loading,
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
