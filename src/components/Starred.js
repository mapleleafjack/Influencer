import React, { useEffect } from 'react'

import { fetchStarred } from '../reducers/index.js'
import { connect } from 'react-redux'
import '../index.css'

function Starred ({ starredData, fetchStarred })  {
  useEffect(()=> {
    fetchStarred()
  }, [])
  if (!starredData) {
    return "Loading data"
  }

  console.log("Loading starr", starredData);


  return <h1> {starredData.map(user => <p key={user.influencer_id}> {user.influencer_instagram_username} </p>)} </h1>;
}


const mapStateToProps = state => {
  return {
    starredData: state.starred
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStarred: () => dispatch (fetchStarred())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Starred);
