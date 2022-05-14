import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import React from "react";
import classNames from "classnames";


export default function SkeletonTweet({
  className,
}) {
  const tweetClasses = classNames("tweet-link", className);

  return (
    <div
      className={tweetClasses}
    >
      <div className="tweet tweet-container">
        <div className="profile-pic-container">
          <Skeleton circle  className="profile-pic"/>
        </div>
        <div className="tweet-content">
          <div className="tweet-content-header">
            <div className="tweet-header-child">
              <span className="tweet-content-child user-full-name">
              <Skeleton count={1} inline/>
            </span>
            <span className="tweet-content-child user-username">
            <Skeleton count={1} inline/>
            </span>
            <span className="tweet-content-child useless-dot"></span>
            <span className="tweet-content-child timestamp">
            <Skeleton count={1} inline/>
            </span>
            </div>
            
          </div>
          <div className="tweet-content-text">
            <Skeleton count={10} className="tweet-text"/>
          </div>
         <div className="tweet-actions">
            <div className="wrap-tweet-actions-child">
              <div className=" tweet-actions-child tweet-comment">
                <div className="tweet-icon">
                <Skeleton circle={true} className="tweet-icon-wrap"/>

                  {/* <i className="far fa-comment"></i> */}
                </div>
              </div>
              <div
                className="tweet-actions-child tweet-retweet"
              >
                <div className="tweet-icon">
                <Skeleton circle={true}/>

                  {/* <i className="far fa-arrows-retweet"></i> */}
                </div>
              </div>
              <div className="tweet-actions-child like-tweet">
                <div className="tweet-icon like-icon">
                <Skeleton circle={true}/>

                  {/* <LikeIcon fill={"#536471"} height="18px" width="18px"/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) ;
}
