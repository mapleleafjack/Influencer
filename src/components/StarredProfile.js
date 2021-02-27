import React from 'react'
import InstagramIcon from '@material-ui/icons/Instagram';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class StarredProfile extends React.Component {
  render() {

    let user = this.props.user;

    return <div className="influencerRow">
              <div className="starredProfile">
                <img alt="imgprofile" src={user.influencer_instagram_profile_image}/>

                <span className="item_container">
                  <span className="profile_name">{user.influencer_full_name}</span>
                  <span className="insta_username"><InstagramIcon/>{user.influencer_instagram_username}</span>
                </span>

                <span className="data_container">
                  <span className="value">{user.statistics.followers}</span>
                  <span className="caption">Followers</span>
                </span>

                <span className="data_container">
                  <span className="value">{user.statistics.engagement}%</span>
                  <span className="caption">Engagement</span>
                </span>
              </div>
              <button className="data_button" onClick={() => this.props.deleteFunction(this.props.index, user)}> <HighlightOffIcon/> </button>
          </div>

  }
}

export default StarredProfile;
