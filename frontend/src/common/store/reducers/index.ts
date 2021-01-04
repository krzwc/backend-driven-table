import { combineReducers, ReducersMapObject } from 'redux';
import { StoreState } from 'common/store/interfaces';
import { entitiesReducer } from './entities-reducer';
import { authReducer } from './auth-reducer';

const reducers: ReducersMapObject<any, any> = {
    entities: entitiesReducer,
    auth: authReducer,
};

export const rootReducer = combineReducers<StoreState>(reducers);
