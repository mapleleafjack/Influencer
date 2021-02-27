import React from 'react'

class SuggestedProfile extends React.Component {
  render() {
    let user = this.props.user;

    return <div>
            <span className="insta_username">{user.influencer_instagram_username}</span>
            <span className="profile_name">{user.influencer_full_name}</span>
            <span className="influencer_photo"><img alt="imgprofile" src={user.influencer_instagram_profile_image}/></span>
            <button onClick={() => this.props.addStarredFunction(this.props.user, this.props.index)}> + </button>
          </div>;
  }
}

export default SuggestedProfile;
