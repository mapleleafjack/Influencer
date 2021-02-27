import axios from "axios";
import { combineReducers } from 'redux';

export function fetchResponse() {
  return function(dispatch) {
    return axios.get("http://localhost:4000/response").then(({ data }) => {
      dispatch(setReponse(data));
    }).catch(error => {
      console.log(error);
    });
  };
}

function setReponse(data) {
  return {
    type: "SET_RESPONSE",
    payload: data
  };
}

export function fetchRemoveStarred(id) {
  console.log("remove", id)
  return function(dispatch) {
    //this should be changed to a delete, pointing the influencer_id (fake json server doesn't support getting an element by ID)
    return axios.get("http://localhost:4000/starred").then(({ data }) => {
      dispatch(setRemoveStarred(data, id));
    }).catch(error => {
      console.log(error);
    });
  };
}

function setRemoveStarred(data, id) {
  return {
    type: "REMOVE_STARRED",
    payload: data,
    id: id
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

const update = (state, mutations) =>
  Object.assign({}, state, mutations)

export const INITIAL_STATE = {
  starred: [],
  suggested: [],
  actions: []
}

function starred(state = INITIAL_STATE.starred, action) {
  switch (action.type) {
    case "SET_STARRED":
      state = action.payload.data;
      break
    case "REMOVE_STARRED":
      state.splice(action.id, 1);
      state = [...state];
      break;
  }
  return state;
}

function suggested (suggested = [], action){
  switch (action.type) {
    case "SET_SUGGESTED":
       suggested = action.payload.data;
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

function actions (suggested = [], action){
  switch (action.type) {
    case "SET_RESPONSE":
       return action.payload.data;
    default:
      return suggested
  }
}
const rootReducer = combineReducers({
    starred: starred,
    suggested: suggested,
    actions: actions
});
export default rootReducer;
