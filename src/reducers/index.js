import axios from "axios";
import {
  combineReducers
} from 'redux';

const ADD_STARRED_RESPONSE = "ADD_STARRED_RESPONSE";
const REMOVE_STARRED = "REMOVE_STARRED";
const GET_STARRED = "GET_STARRED";
const GET_SUGGESTED = "GET_SUGGESTED";
const ADD_SUGGESTED = "ADD_SUGGESTED";

const SERVER_ADDRESS = "http://localhost:4000";

export const INITIAL_STATE = {
  starred: [],
  suggested: [],
  actions: [],
  sort: "username"
}


//calls
export function addToStarred(user, index) {
  return function(dispatch) {
    return axios.get(SERVER_ADDRESS + "/response").then(({
      data
    }) => {
      dispatch(addToStarredResponse(data, user, index));
    }).catch(error => {
      console.log(error);
    });
  };
}
export function fetchRemoveStarred(id, user) {
  return function(dispatch) {
    return axios.get(SERVER_ADDRESS + "/starred").then(({
      data
    }) => {
      dispatch(setRemoveStarred(data, id, user));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchStarred(sort) {
  return function(dispatch) {
    return axios.get(SERVER_ADDRESS + "/starred").then(({
      data
    }) => {
      dispatch(getStarred(data, sort));
    }).catch(error => {
      console.log(error);
    });
  };
}

export function fetchSuggested() {
  return function(dispatch) {
    return axios.get(SERVER_ADDRESS + "/suggested").then(({
      data
    }) => {
      dispatch(setSuggested(data));
    }).catch(error => {
      console.log(error);
    });
  };
}

//responses
function addToStarredResponse(data, user, index) {
  return {
    type: ADD_STARRED_RESPONSE,
    payload: data,
    user: user,
    id: index
  };
}

function setRemoveStarred(data, id, user) {
  return {
    type: REMOVE_STARRED,
    payload: data,
    id: id,
    user: user
  };
}

function getStarred(data, sort) {
  return {
    type: GET_STARRED,
    payload: data,
    sort: sort
  };
}

function setSuggested(data) {
  return {
    type: GET_SUGGESTED,
    payload: data
  };
}

function addSuggested(data) {
  return {
    type: ADD_SUGGESTED,
    payload: data
  };
}

//data response sorting function
//add more cases here (reverse can be parametrised together with "data");

function sortData(data){
  let ordered;

  switch (INITIAL_STATE.sort) {
    case "username":
      data.sort(function(a, b) {
        return a.influencer_instagram_username.localeCompare(b.influencer_instagram_username)
      });
      ordered = [...data];
      break;
    case "name":
      data.sort(function(a, b) {
        return a.influencer_full_name.localeCompare(b.influencer_full_name)
      });
      ordered = [...data];
      break;
    case "followers":
      data.sort(function(a, b) {
        return b.statistics.followers - (a.statistics.followers)
      });
      ordered = [...data];
      break;
    case "engagement":
      data.sort(function(a, b) {
        return b.statistics.engagement - (a.statistics.engagement)
      });
      ordered = [...data];
      break;

    default:
      break;
    }
  return ordered;
}

function starred(state = INITIAL_STATE.starred, action) {
  switch (action.type) {
    case GET_STARRED:
      if (!action.sort){
        action.sort = "username";
        state = sortData(action.payload.data);
      } else {
        INITIAL_STATE.sort = action.sort;
        state = sortData(state);
      }
      break
    case REMOVE_STARRED:
      let element_removed = state.splice(action.id, 1);
      state = [...state];
      break;
    case ADD_STARRED_RESPONSE:
      // fake data, should be returned by the server
      // action.payload holds the fake API response
      // there should be an evaluaton of action.payload.status
      // and then adding the data from action.payload.data

      // instead for this demo we copy over the data
      // adding the necessary bits
      action.user.statistics = {
        followers: randomInRange(0,40000).toFixed(0),
        engagement:randomInRange(0,10).toFixed(2)
      };

      state = sortData([...state, action.user]);
      break;
    default:
      return state
  }
  return state;
}

function randomInRange(min, max) {
  return Math.random() * (max-min) + min;
}

function suggested(state = INITIAL_STATE.suggested, action) {
  switch (action.type) {
    case GET_SUGGESTED:
      state = action.payload.data;
      break;
    case ADD_STARRED_RESPONSE:
      state.splice(action.id, 1);
      state = [...state];
      break;
    case REMOVE_STARRED:
      console.log("remove?" + action.user);
      state = [...state, action.user];
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
