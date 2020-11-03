import { ENTITY_ACTIONS, ENTITY_TYPES } from 'common/consts';
import { EntitiesAction } from 'common/store/interfaces';

export const entityRequestStart = (entityType: ENTITY_TYPES): EntitiesAction => ({
    type: ENTITY_ACTIONS.ENTITY_REQUEST_START,
    payload: {
        entityType,
    },
});
