import React, { useEffect } from 'react'

import { fetchStarred } from '../reducers/index.js'
import { fetchRemoveStarred } from '../reducers/index.js'
import { connect } from 'react-redux'
import '../index.css'

function Starred ({ starredData, fetchStarred,  fetchRemoveStarred})  {
  useEffect(()=> {
    fetchStarred()
  }, [])
  if (!starredData) {
    return "Loading data"
  }

  console.log(starredData);

  return <div>
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
  console.log(state);
  return {
    starredData: state.starred
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchStarred: () => dispatch (fetchStarred()),
    fetchRemoveStarred: (id) => {
      dispatch(fetchRemoveStarred(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Starred);
