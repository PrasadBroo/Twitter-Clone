import classNames from "classnames";
import React from "react";

export default function Input({ type ,className,id,placeholder,focused,...otherProps}) {
    const inputClassnames = classNames('input',className)
    const inputWrapClassNames =  classNames('input-wrap',{focused})
  return (
    <div className={inputWrapClassNames}>
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
