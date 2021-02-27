import React from 'react'
import InstagramIcon from '@material-ui/icons/Instagram';

import '../index.scss'

class SuggestedProfile extends React.Component {
  render() {
    let user = this.props.user;

    return <div className="suggestedProfile" onClick={() => this.props.addStarredFunction(this.props.user, this.props.index)}>
            <img alt="imgprofile" src={user.influencer_instagram_profile_image}/>
            <span className="item_container">
              <span className="profile_name">{user.influencer_full_name}</span>
              <span className="insta_username"><InstagramIcon/>{user.influencer_instagram_username}</span>
            </span>
          </div>;
  }
}

export default SuggestedProfile;
