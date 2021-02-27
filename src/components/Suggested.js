import React, { useEffect } from 'react'
import SuggestedProfile from './SuggestedProfile'

import {fetchSuggested} from '../reducers/index.js'
import {addToStarred} from '../reducers/index.js'

import { connect } from 'react-redux'
import '../index.scss'


function Suggested ({ suggestedData, fetchSuggested, addToStarred })  {
  useEffect(()=> {
    fetchSuggested()
  }, [fetchSuggested])
  if (!suggestedData) {
    return "Loading data"
  }
  return <div>
  {
    suggestedData.length > 0 ? suggestedData.map
    (
      (user, index) => <SuggestedProfile className="jack" key={user.influencer_id} index={index} user={user} addStarredFunction={addToStarred} />
    ) : <h1> No more data to show </h1>
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
