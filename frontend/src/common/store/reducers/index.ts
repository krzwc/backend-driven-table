import { ReducersMapObject } from 'redux';
import { combineReducers } from 'redux-immutable';
import { StoreState, EntitiesAction } from 'common/store/interfaces';
import { entitiesReducer } from './entities-reducer';

const reducers: ReducersMapObject<any, EntitiesAction> = {
    entities: entitiesReducer,
};

export const rootReducer = combineReducers<StoreState>(reducers);
