import React from "react";
import { useQuery } from "react-query";
import { fetchNews } from "../../services/userServices";
import SimpleSpinner from "../Loader/SimpleSpinner";
import NewsItem from "./NewsItem";
const size = 5;
const queryOptions = { refetchOnMount: false, refetchOnWindowFocus: false };
export default function News() {
  const { isLoading, data, error } = useQuery("news", fetchNews, queryOptions);

  return (
    <div className="news-section">
      {isLoading && !data && <SimpleSpinner topCenter />}
      {data && (
        <>
          <div className="news-heading-main">
            <h2>What's happening</h2>
          </div>
          <div className="news-items">
            {data.results.slice(0, size).map((news) => (
              <NewsItem
                image_url={news.image_url}
                heading={news.title}
                link={news.link}
                key={news.pubDate}
              />
            ))}
          </div>
        </>
      )}
      {error && <h3 className="error-text">{error.message}</h3>}
    </div>
  );
}
