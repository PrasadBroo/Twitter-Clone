import React from 'react';
import FollowUser from '../FollowUser/FollowUser';

export default function WhoToFollow() {
  return <div className='who-to-follow-suggestions'>
    <div className="who-to-follow-heading-container">
      <h2>Who to follow</h2>
    </div>
    <FollowUser/>
    <FollowUser/>
    <FollowUser/>
    <FollowUser/>
  </div>;
}
