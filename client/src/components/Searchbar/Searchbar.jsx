import React from "react";

export default function Searchbar() {
  return (
    <div className="searchbar">
      <label htmlFor="search-input" className="search-input-label">
        <div className="search-icon-container">
          <i className="fas fa-search"></i>
        </div>
        <div className="wrap-search-input">
          <input
            type="text"
            name="search-text"
            className="search-input"
            id="search-input"
            placeholder="Search Twitter Clone"
          />
        </div>
      </label>
    </div>
  );
}
