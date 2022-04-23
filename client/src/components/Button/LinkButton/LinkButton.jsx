import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

export default function LinkButton({
  icon,
  img,
  linkText,
  href,
  children,
  customstyle,
  targetBlank,
  className,
  externalLink,
  ...otherProps
}) {
  const linkButtonClass = classNames("button", "link-button", className);
  return !externalLink ? (
    <Link
      className={linkButtonClass}
      to={href}
      replace
      style={customstyle}
      target={targetBlank && "_blank"}
      rel={targetBlank && "noopener noreferrer"}
      {...otherProps}
    >
      <span className="icon-container">
        {icon && icon}
        {img && <img src={img} alt="icon" />}
      </span>
      {linkText}
      {children}
    </Link>
  ) : (
    <a
      href={href}
      className={linkButtonClass}
      style={customstyle}
      target={targetBlank && "_blank"}
      rel={targetBlank && "noopener noreferrer"}
      {...otherProps}
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
