import { applyMiddleware, createStore, compose } from 'redux';
import { Map } from 'immutable';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

const INITIAL_STATE = Map();

declare global {
    interface Window {
        /* eslint-disable */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware: any = [thunk];

export const store = createStore(rootReducer, INITIAL_STATE, composeEnhancers(applyMiddleware(...middleware)));
