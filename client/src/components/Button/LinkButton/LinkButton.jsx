import classNames from "classnames";
import React from "react";


export default function LinkButton({
  icon,
  img,
  linkText,
  href,
  children,
  customstyle,
  targetBlank,
  className,
}) {
  const linkButtonClass = classNames('button','link-button',className)
  return (
    <a
    className={linkButtonClass}
      href={href}
      style={customstyle}
      target={targetBlank && "_blank"}
      rel={targetBlank && "noopener noreferrer"}
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
