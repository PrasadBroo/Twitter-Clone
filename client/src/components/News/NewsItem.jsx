import React from "react";

export default function NewsItem({image_url,heading,link}) {
  return (
    <div className="news-item">
      <div className="news-heading">
        <a href={link} className="news-item-text" target="_blank" rel="noopener noreferrer">
          {heading || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem quod nostrum id tenetur! Eaque, aperiam!"}
        </a>
      </div>
      <div className="news-image-container">
        <img
          src={image_url || "https://via.placeholder.com/70"}
          alt="news"
          className="news-image"
        />
      </div>
    </div>
  );
}
