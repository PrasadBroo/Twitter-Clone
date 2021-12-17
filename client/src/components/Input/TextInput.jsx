import React from "react";

export default function TextInput({ placeHolder,isFocused, ...inputProps }) {
  return (
    <div className="input-wrap">
      <input
        type="text"
        name="user_text"
        className="input input-text"
        id="user_text"
        {...inputProps}
      />
      <label htmlFor="user_text" className="input-label">
        {placeHolder}
      </label>
    </div>
  );
}
