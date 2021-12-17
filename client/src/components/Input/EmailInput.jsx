import React from "react";

export default function EmailInput() {
  return (
    <div className="input-wrap">
      <input
        type="email"
        name="user_email"
        className="input input-email"
        id="user_email"
      />
      <label htmlFor="user_email" className="input-label">
        Email
      </label>
    </div>
  );
}
