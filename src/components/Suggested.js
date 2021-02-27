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
            <div className="header">
              <span className="title">Suggested Influencers</span>
            </div>
            <div className="starred_content">
            {
              suggestedData.length > 0 ? suggestedData.map
              (
                (user, index) => <SuggestedProfile className="jack" key={user.influencer_id} index={index} user={user} addStarredFunction={addToStarred} />
              ) : <p className="empty_content"> No more suggested profile for today! Come back tomorrow ;) </p>
            }
            </div>
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
