import React, { useEffect } from 'react'

import {fetchSuggested} from '../reducers/index.js'
import {addToStarred} from '../reducers/index.js'

import { connect } from 'react-redux'
import '../index.css'

function Suggested ({ suggestedData, fetchSuggested, addToStarred })  {
  useEffect(()=> {
    fetchSuggested()
  }, [])
  if (!suggestedData) {
    return "Loading data"
  }
  return <div>
  {
    suggestedData.map
    (
      (user, index) =>
        <p key={user.influencer_id}> {user.influencer_instagram_username}
          <button
            onClick={() => addToStarred(user, index)}>
            +
          </button>
        </p>
    )
  }
  </div>;
}

const mapStateToProps = state => {
  return {
    suggestedData: state.suggested
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSuggested: () => dispatch (fetchSuggested()),
    addToStarred: (user, index) => {
      dispatch(addToStarred(user, index))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);
