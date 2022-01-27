import React from "react";

export default function NewsItem() {
  return (
    <div className="news-item">
      <div className="news-heading">
        <p className="news-item-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem quod
          nostrum id tenetur! Eaque, aperiam!
        </p>
      </div>
      <div className="news-image-container">
        <img
          src="https://via.placeholder.com/70"
          alt="news"
          className="news-image"
        />
      </div>
    </div>
  );
}
