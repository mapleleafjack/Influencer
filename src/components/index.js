import axios from "axios";
import { combineReducers } from 'redux';

export function addToStarred(user, index) {
  return function(dispatch) {
    return axios.get("http://localhost:4000/response").then(({ data }) => {
      dispatch(addToStarredResponse(data, user, index));
    }).catch(error => {
      console.log(error);
    });
  };
}

function addToStarredResponse(data, user, index) {
  return {
    type: "ADD_STARRED_RESPONSE",
    payload: data,
    user: user,
    id: index
  };
}

export function fetchRemoveStarred(id) {
  return function(dispatch) {
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
      dispatch(getStarred(data));
    }).catch(error => {
      console.log(error);
    });
  };
}

function getStarred(data) {
  return {
    type: "GET_STARRED",
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
    type: "GET_SUGGESTED",
    payload: data
  };
}
function addSuggested(data) {
  return {
    type: "ADD_SUGGESTED",
    payload: data
  };
}

export const INITIAL_STATE = {
  starred: [],
  suggested: [],
  actions: []
}

function starred(state = INITIAL_STATE.starred, action) {
  switch (action.type) {
    case "GET_STARRED":
      state = action.payload.data;
      break
    case "REMOVE_STARRED":
      state.splice(action.id, 1);
      state = [...state];
      break;
    case "ADD_STARRED_RESPONSE":
      console.log(action);
      state = [...state, action.user];
      break;
    default:
      return state
  }
  return state;
}

function suggested (state = INITIAL_STATE.suggested, action){
  switch (action.type) {
    case "GET_SUGGESTED":
       state = action.payload.data;
       break;
   case "ADD_STARRED_RESPONSE":
       state.splice(action.id, 1);
       state = [...state];
       break;
    default:
      return state
  }
  return state;
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
const rootReducer = combineReducers({
    starred: starred,
    suggested: suggested
});
export default rootReducer;
