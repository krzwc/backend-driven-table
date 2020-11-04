import { ENTITY_ACTIONS, ENTITY_TYPES } from 'common/consts';
import { EntitiesAction } from 'common/store/interfaces';

export const entityRequestFailure = (entityType: ENTITY_TYPES, replaceMode: boolean): EntitiesAction => ({
    type: ENTITY_ACTIONS.ENTITY_REQUEST_FAILURE,
    payload: {
        entityType,
        replaceMode,
    },
});
