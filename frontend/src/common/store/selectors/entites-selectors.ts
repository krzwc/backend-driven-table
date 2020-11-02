import { List, Map } from 'immutable';
import { createSelector } from 'reselect';

import { ENTITY_TYPES } from '../../consts';
import { Entity } from '../../interfaces';
import { stateSelector } from './state-selector';

export const entitiesStateSelector = createSelector(stateSelector, (state) => state.get('entities', Map()));

export const entitiesSelector = (entityType: ENTITY_TYPES) =>
    createSelector(entitiesStateSelector, (entitiesState) => entitiesState.get(entityType, Map()));

export const entitiesDataSelector = (entityType: ENTITY_TYPES) =>
    createSelector(entitiesSelector(entityType), (entityInfo) => {
        return entityInfo.get('data', List());
    });

export const entitiesStatusSelector = (entityType: ENTITY_TYPES) =>
    createSelector(entitiesSelector(entityType), (entityInfo) => entityInfo.get('status'));

export const entitySelector = (entityType: ENTITY_TYPES) => (property: string, value: number | string) =>
    createSelector(entitiesDataSelector(entityType), (entitiesData) =>
        entitiesData.find((entity: Entity) => entity.get(property) === value, null, Map()),
    );
