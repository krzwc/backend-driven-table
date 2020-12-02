import { combineReducers } from 'redux-immutable';
import { entitiesReducer } from './entities-reducer';
import { authReducer } from './auth-reducer';

export const rootReducer = combineReducers({
    entities: entitiesReducer,
    auth: authReducer,
});
