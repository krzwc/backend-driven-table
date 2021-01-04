import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { StoreState } from 'common/store/interfaces';

const INITIAL_STATE = {} as StoreState;

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware: any = [thunk];

export const store = createStore(rootReducer, INITIAL_STATE, composeEnhancers(applyMiddleware(...middleware)));
