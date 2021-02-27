import React from 'react'
import { Button, NativeSelect } from '@material-ui/core';

class StarredProfile extends React.Component {
  render() {

    let user = this.props.user;

    return <div className="starredProfile">
            <span className="influencer_photo"><img alt="imgprofile" src={user.influencer_instagram_profile_image}/></span>

            <span className="item_container">
              <span className="profile_name">{user.influencer_full_name}</span>
              <span className="insta_username">@{user.influencer_instagram_username}</span>
            </span>

            <span className="data_container">
              <span className="profile_followers">{user.statistics.followers}</span>
              <span className="engagement">{user.statistics.engagement}</span>
            </span>

            <Button onClick={() => this.props.deleteFunction(this.props.index)}> X </Button>
          </div>;
  }
}

export default StarredProfile;
