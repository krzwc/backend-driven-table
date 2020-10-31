import { ENTITY_ACTIONS, ENTITY_TYPES } from '../../consts';

export const entityRequestStart = (entityType: ENTITY_TYPES) => ({
  type: ENTITY_ACTIONS.ENTITY_REQUEST_START,
  payload: {
    entityType,
  },
});
