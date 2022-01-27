import React from 'react';
import NewsItem from './NewsItem';

export default function News() {
  return <div className='news-section'>
    <div className="news-heading-main">
      <h2>What's happening</h2>
    </div>
    <div className="news-items">
      <NewsItem/>
      <NewsItem/>
      <NewsItem/>
      <NewsItem/>
    </div>
  </div>;
}
