import axios from "axios";
import { combineReducers } from 'redux';

export function fetchResponse() {
  return function(dispatch) {
    return axios.get("http://localhost:4000/response").then(({ data }) => {
      dispatch(setReposnse(data));
    }).catch(error => {
      console.log(error);
    });
  };
}

function setReposnse(data) {
  return {
    type: "SET_RESPONSE",
    payload: data
  };
}


export function fetchStarred() {
  return function(dispatch) {
    return axios.get("http://localhost:4000/starred").then(({ data }) => {
      dispatch(setStarred(data));
    }).catch(error => {
      console.log(error);
    });
  };
}

function setStarred(data) {
  return {
    type: "SET_STARRED",
    payload: data
  };
}

export function fetchSuggested() {
  return function(dispatch) {
    return axios.get("http://localhost:4000/suggested").then(({ data }) => {
      dispatch(setSuggested(data));
    }).catch(error => {
      console.log(error);
    });
  };
}

function setSuggested(data) {
  return {
    type: "SET_SUGGESTED",
    payload: data
  };
}
function addSuggested(data) {
  return {
    type: "ADD_SUGGESTED",
    payload: data
  };
}

const initialStarred = [];
function starred (starred = initialStarred, action){
  switch (action.type) {
    case "SET_STARRED":
       starred = action.payload.data;
       return starred;
    default:
      return starred
  }
}

const initialSuggested = [];
function suggested (suggested = initialSuggested, action){
  switch (action.type) {
    case "SET_SUGGESTED":
       suggested = action.payload.data;
       return suggested;
       return suggested;
    default:
      return suggested
  }
}

export const fetchAddSuggested = requestObj => {
    return (dispatch) => {
        axios.get('http://localhost:4000/response', requestObj)
        .then(data => {
            dispatch(addSuggested(data))
        })
        .catch(error => {
            console.log(error);
        });
    }
}


function response (suggested = [], action){
  switch (action.type) {
    case "ADD_SUGGESTED":
       return action.payload.data;
    default:
      return suggested
  }
}
const rootReducer = combineReducers({
    starred: starred,
    suggested: suggested,
    response: response
});
export default rootReducer;
