import produce, { Draft } from 'immer';

import { EntitiesAction, EntitiesPayload } from 'common/store/interfaces';
import { ENTITY_ACTIONS, REQUEST_STATUSES } from 'common/consts';

import { updateSingleEntity, removeFromArray } from './helpers';

export type EntitiesReducerState = Record<string, any>;
const _hasOwnProperty = Object.prototype.hasOwnProperty;

export const entitiesReducer = produce((draft: Draft<EntitiesReducerState>, action: EntitiesAction) => {
    const { type, payload } = action;
    const { data = {}, entityType, replaceMode } = payload || ({} as EntitiesPayload);

    switch (type) {
        case ENTITY_ACTIONS.ENTITY_REQUEST_START:
            if (_hasOwnProperty.call(draft, entityType) && _hasOwnProperty.call(draft[entityType], 'status')) {
                draft[entityType]['status'] = REQUEST_STATUSES.PENDING;
            } else {
                draft[entityType] = { status: REQUEST_STATUSES.PENDING };
            }
            return;
        case ENTITY_ACTIONS.UPDATE_ENTITY_SUCCESS:
            draft[entityType]['status'] = REQUEST_STATUSES.SUCCESS;
            draft[entityType]['data'] = updateSingleEntity(draft[entityType]['data'] || [], data, replaceMode);
            return;
        case ENTITY_ACTIONS.READ_ENTITY_SUCCESS: {
            const entitiesData = Array.isArray(data) ? data : [data];
            draft[entityType] = { status: REQUEST_STATUSES.SUCCESS, data: entitiesData };
            return;
        }
        case ENTITY_ACTIONS.CREATE_ENTITY_SUCCESS:
            draft[entityType] = { status: REQUEST_STATUSES.SUCCESS, data };
            return;
        case ENTITY_ACTIONS.DELETE_ENTITY_SUCCESS:
            draft[entityType]['status'] = REQUEST_STATUSES.SUCCESS;
            removeFromArray(draft[entityType]['data'], data); // ???? Perhaps removeFromArray must return spliced array
            return;
        case ENTITY_ACTIONS.ENTITY_REQUEST_FAILURE:
            draft[entityType]['status'] = REQUEST_STATUSES.FAILURE;
            //TODO: clear entity state for if (replaceMode)
            return;
    }
}, {});
