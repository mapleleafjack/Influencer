import React from 'react'
import ReactDOM from 'react-dom'

import Suggested from './components/Suggested'
import Starred from './components/Starred'

import rootReducer from './reducers'

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'

// Note: this API requires redux@>=3.1.0
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) //needed so you can do async
);

const rootEl = document.getElementById('root')



const render = () => ReactDOM.render(
  <Provider store={store}>
    <div>
      <div className="suggested">
        <Suggested />
      </div>
      <div className="starred">
        <Starred />
      </div>
    </div>
  </Provider>,
  rootEl
)

render()
store.subscribe(render)
