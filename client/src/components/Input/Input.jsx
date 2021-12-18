import classNames from "classnames";
import React from "react";

export default function Input({ type ,className,id,placeholder,focused,...otherProps}) {
    const inputClassnames = classNames('input',className,{focused})
  return (
    <div className="input-wrap">
      <input
        type={type}
        name={"user_"+type}
        className={inputClassnames}
        id={id}
        {...otherProps}
      />
      <label htmlFor={id} className="input-label">
        {placeholder}
      </label>
    </div>
  );
}
