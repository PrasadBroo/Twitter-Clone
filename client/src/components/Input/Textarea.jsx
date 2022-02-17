import React from 'react'
import  classNames  from 'classnames';

export default function Textarea({ className,id,placeholder,focused,rows,...otherProps}) {
  const inputWrapClassNames =  classNames('input-wrap',{focused})
    return (
        <div className={inputWrapClassNames}>
          <textarea
            rows={rows || 10}
            name="user_text"
            className={"input input-text input-textarea "+className}
            id="user_textarea"
            {...otherProps}
          ></textarea>
          <label htmlFor="user_textarea" className="input-label">
            {placeholder}
          </label>
        </div>
      );
}
