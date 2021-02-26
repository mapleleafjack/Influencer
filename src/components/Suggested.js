import React, { useEffect } from 'react'

import {fetchSuggested} from '../reducers/index.js'
import { connect } from 'react-redux'
import '../index.css'

function Suggested ({ suggestedData, fetchSuggested })  {
  useEffect(()=> {
    fetchSuggested()
  }, [])
  if (!suggestedData) {
    return "Loading data"
  }
  console.log("Suggested data", suggestedData);

  return <div> {suggestedData.map(user => <p key={user.influencer_id}> {user.influencer_instagram_username} <button id={user.influencer_id} onClick={sayHello}>+</button> </p>)}  </div>;
}

function sayHello(e) {
  console.log('Hello!', e);
}

const mapStateToProps = state => {
  return {
    suggestedData: state.suggested
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSuggested: () => dispatch (fetchSuggested())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggested);
