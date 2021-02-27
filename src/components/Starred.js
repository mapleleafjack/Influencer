import React, { useEffect } from 'react'
import StarredProfile from './StarredProfile'
import { NativeSelect } from '@material-ui/core';

import { fetchStarred } from '../reducers/index.js'
import { fetchRemoveStarred } from '../reducers/index.js'

import TagFacesIcon from '@material-ui/icons/TagFaces';

import { connect } from 'react-redux'
import '../index.scss'

function Starred ({ starredData, fetchStarred,  fetchRemoveStarred})  {
  useEffect(()=> {
    fetchStarred()
  }, [fetchStarred])
  if (!starredData) {
    return "Loading data"
  }
  return <div>
            //this can have its own component
            <div className="header">
              <span className="title">Starred Influencers</span>
              <label className="filter"> Sort by:  &nbsp;&nbsp;
                <NativeSelect  name="order" id="order" onChange={(e) => fetchStarred(e.target.value)}>
                  <option value="username">Username</option>
                  <option value="name">Name</option>
                  <option value="followers">Followers</option>
                  <option value="engagement">Engagement</option>
                </NativeSelect>
              </label>
            </div>
            //

            <div className="starred_content">
            {
              starredData.length > 0 ? starredData.map
              (
                (user, index) => <StarredProfile key={user.influencer_id} user={user} index={index} deleteFunction={fetchRemoveStarred}/>
              ) :
              <div className="empty_content">
                <p className="empty_text"> You haven't starred any profile yet<br/> Start with the suggested influencer! </p>
                <TagFacesIcon/>
              </div>
            }
            </div>
        </div>;
}


const mapStateToProps = state => {
  return {
    starredData: state.starred
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchStarred: (sort) => dispatch (fetchStarred(sort)),
    fetchRemoveStarred: (id, user) => {
      dispatch(fetchRemoveStarred(id, user))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Starred);
