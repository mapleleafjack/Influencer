import React, { useEffect } from 'react'

import { fetchStarred } from '../reducers/index.js'
import { fetchRemoveStarred } from '../reducers/index.js'
import { sortCollection } from '../reducers/index.js'
import { connect } from 'react-redux'
import '../index.css'

function Starred ({ starredData, fetchStarred,  fetchRemoveStarred})  {
  useEffect(()=> {
    fetchStarred()
  }, [fetchStarred])
  if (!starredData) {
    return "Loading data"
  }
  return <div>
  <select name="order" id="order" onChange={(e) => fetchStarred(e.target.value)}>
    <option value="id">ID</option>
    <option value="username">Username</option>
    <option value="name">Name</option>
  </select>
  {
    starredData.map
    (
      (user, index) =>
        <p key={user.influencer_id}> {user.influencer_instagram_username}
          <button
            onClick={() => fetchRemoveStarred(index)}>
            X
          </button>
        </p>
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
