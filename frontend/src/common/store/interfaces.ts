import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ImmutableMap } from 'common/interfaces';
import { ENTITY_TYPES, ENTITY_ACTIONS } from 'common/consts';

import { AuthState } from './actions/auth/interfaces';

export type StoreState = ImmutableMap<{
    entities: Record<string, unknown>;
    auth: AuthState;
}>;

export interface EntitiesPayloadData {
    [key: string]: any;
}

export interface EntitiesPayload {
    entityType: ENTITY_TYPES;
    data?: EntitiesPayloadData;
    replaceMode?: boolean;
    /* filters?: any;
    page?: any;
    search?: any;
    aditionalData?: any */
}

export interface EntitiesAction extends Action<ENTITY_ACTIONS> {
    payload: EntitiesPayload;
}

export interface EntityData {
    [key: string]: any;
}

export type CommonThunkAction<A> = ThunkAction<Promise<A>, StoreState, null, Action>;

export type CommonThunkDispatch = ThunkDispatch<StoreState, null, Action>;
