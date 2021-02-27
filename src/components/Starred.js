import React, { useEffect } from 'react'
import StarredProfile from './StarredProfile'
import { NativeSelect } from '@material-ui/core';

import { fetchStarred } from '../reducers/index.js'
import { fetchRemoveStarred } from '../reducers/index.js'

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
            <div className="header">
              <span className="title">Starred Influencers</span>

              <span className="filter">
                Sort by:
                <NativeSelect name="order" id="order" onChange={(e) => fetchStarred(e.target.value)}>
                  <option value="username">Username</option>
                  <option value="name">Name</option>
                  <option value="followers">Followers</option>
                  <option value="engagement">Engagement</option>
                </NativeSelect>
              </span>

            </div>
            <div className="starred_content">
            {
              starredData.length > 0 ? starredData.map
              (
                (user, index) => <StarredProfile key={user.influencer_id} user={user} index={index} deleteFunction={fetchRemoveStarred}/>
              ) : <p className="empty_content"> You haven't starred any profile, start with the suggested influencer! </p>
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
