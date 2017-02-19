import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App'
import './index.css';

import { createBrowserHistory } from 'history'

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'

import {
  connectRouter,
  routerMiddleware,
  ConnectedRouter
} from 'connected-react-router'

const history = createBrowserHistory()

const initialState = {}

import { combineReducers } from 'redux';

function exampleReducer(state = {}, action) {
  return state;
}

const appReducer = combineReducers({exampleReducer})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

import thunk from 'redux-thunk';

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
      // ... other middlewares ...
    ),
  ),
)

import {
  Route,
} from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
