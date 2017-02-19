require('mock-local-storage')
import { mount } from 'enzyme'
import React from 'react';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers} from 'redux'
import { createBrowserHistory } from 'history'

export const mountWithState = (Component, initialState, reducers) => {
  function emptyReducer(state = {}, action) {
    return state;
  }

  const appReducer = combineReducers(reducers || {emptyReducer})
  const rootReducer = (state, action) => {
    if (action.type === 'RESET') { state = undefined }
    return appReducer(state, action);
  }

  const history = createBrowserHistory()
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk
        // ... other middlewares ...
      ),
    ),
  )

  const context = {
    store: store
  };

  return {
    wrapper: mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {React.cloneElement(Component, {})}
        </ConnectedRouter>
      </Provider>, { context }),
    store: store
  }
};

