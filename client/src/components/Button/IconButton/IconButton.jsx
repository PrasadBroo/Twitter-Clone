import React from "react";

export default function IconButton({
  icon,
  img,
  buttonText,
  onClick,
  children,
  customstyle,
}) {
  return (
    <button className="button icon-button" onClick={onClick} style={customstyle}>
      <span className="icon-container">{icon && icon}{img && <img
        src={img}
        alt="icon"
      />}</span>
      {buttonText}
      {children}
    </button>
  );
}
