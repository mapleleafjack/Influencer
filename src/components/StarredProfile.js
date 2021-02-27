import React from 'react'

class StarredProfile extends React.Component {
  render() {

    let user = this.props.user;

    return <div>
            <span className="insta_username">{user.influencer_instagram_username}</span>
            <span className="profile_followers">{user.statistics.followers}</span>
            <span className="profile_name">{user.influencer_full_name}</span>
            <span className="engagement">{user.statistics.engagement}</span>
            <span className="influencer_photo"><img alt="imgprofile" src={user.influencer_instagram_profile_image}/></span>
            <button onClick={() => this.props.deleteFunction(this.props.index)}> X </button>
          </div>;
  }
}

export default StarredProfile;
