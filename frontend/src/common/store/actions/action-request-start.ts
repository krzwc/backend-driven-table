import { ENTITY_ACTIONS, ENTITY_TYPES } from '../../consts';
import { EntitiesAction } from '../interfaces';

export const entityRequestStart = (entityType: ENTITY_TYPES): EntitiesAction => ({
    type: ENTITY_ACTIONS.ENTITY_REQUEST_START,
    payload: {
        entityType,
    },
});
