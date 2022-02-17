import React from 'react'

export default function Textarea({ className,id,placeholder,focused,rows,...otherProps}) {
    return (
        <div className="input-wrap">
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
