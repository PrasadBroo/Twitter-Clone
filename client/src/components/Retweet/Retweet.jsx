import profilePic from "../../static/images/profile.jpg";
import { Link } from 'react-router-dom';

export default function Retweet() {
  return (
    <div className="retweet">
      <div className="tweet tweet-container">
      <div className="profile-pic-container">
        <img src={profilePic} alt="user-pic" className="profile-pic" />
        <span className="hr-line"></span>
      </div>
      <div className="tweet-content">
        <div className="tweet-content-header">
          <span className="tweet-content-child user-full-name">
            Prasad Shinde
          </span>
          <span className="tweet-content-child user-username">@Prasadbro</span>
          <span className="tweet-content-child useless-dot"></span>
          <span className="tweet-content-child timestamp">18h</span>
          
        </div>
        <div className="tweet-content-text">
          <p className="tweet-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            quidem eaque nemo, excepturi similique ex minus natus nam sapiente
            aspernatur. Exercitationem, dignissimos dolorem temporibus delectus
            aliquam vitae, modi, veritatis molestiae nam ipsa nulla dolore
            ipsam. Fuga, velit. Officiis vel debitis labore velit eaque.
            Quisquam, eligendi! Nemo ducimus atque ullam tenetur?
          </p>
        </div>
        <div className="reaplying-to">
            <span>Replaying to <Link to='/prasadbro' className="default-link reaplyin-to-link">@prasadbro</Link></span>
        </div>
      </div>
    </div>
    </div>
    
  );
}
