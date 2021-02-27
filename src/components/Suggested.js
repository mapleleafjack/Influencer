import React, { useEffect } from 'react'

import {fetchSuggested} from '../reducers/index.js'
import {fetchResponse} from '../reducers/index.js'

import { connect } from 'react-redux'
import '../index.css'

function Suggested ({ suggestedData, fetchSuggested, fetchResponse })  {
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
      user =>
        <p key={user.influencer_id}> {user.influencer_instagram_username}
          <button id={user.influencer_id}
            onClick={() => fetchResponse()}>
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
    fetchResponse: () => {
      dispatch(fetchResponse())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);
