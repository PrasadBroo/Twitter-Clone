import React from "react";

export default function LinkButton({
  icon,
  img,
  linkText,
  href,
  children,
  customstyle,
  targetBlack,
}) {
  return (
    <a
      className="link-button"
      href={href}
      style={customstyle}
      target={targetBlack && "_blank"}
      rel={targetBlack && "noopener noreferrer"}
    >
      <span className="icon-container">
        {icon && icon}
        {img && <img src={img} alt="icon" />}
      </span>
      {linkText}
      {children}
    </a>
  );
}
