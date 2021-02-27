import React, { useEffect } from 'react'
import SuggestedProfile from './SuggestedProfile'

import {fetchSuggested} from '../reducers/index.js'
import {addToStarred} from '../reducers/index.js'

import WbSunnyIcon from '@material-ui/icons/WbSunny';

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
              ) :
              <div className="empty_content">
                <p className="empty_text"> No more suggested profiles for today! <br/> Come back tomorrow </p>
                <WbSunnyIcon/>
              </div>
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
