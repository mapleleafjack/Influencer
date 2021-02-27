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
            <NativeSelect name="order" id="order" onChange={(e) => fetchStarred(e.target.value)}>
              <option value="username">Username</option>
              <option value="name">Name</option>
              <option value="followers">Followers</option>
              <option value="engagement">Engagement</option>
            </NativeSelect>
            {
              starredData.map
              (
                (user, index) => <StarredProfile key={user.influencer_id} user={user} index={index} deleteFunction={fetchRemoveStarred}/>
              )
            }
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
    fetchRemoveStarred: (id) => {
      dispatch(fetchRemoveStarred(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Starred);
