import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { StoreState, EntitiesAction } from 'common/store/interfaces';
import { AuthenticationAction } from 'common/store/actions/auth/interfaces';
import { entitiesReducer } from './entities-reducer';
import { authReducer } from './auth-reducer';

const reducers: ReducersMapObject<any, EntitiesAction & AuthenticationAction> = {
    entities: entitiesReducer,
    auth: authReducer,
};

export const rootReducer = combineReducers<StoreState>(reducers);
