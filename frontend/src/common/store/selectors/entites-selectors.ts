import { createSelector, OutputSelector } from 'reselect';
import { ENTITY_TYPES } from 'common/consts';
import { Entity } from 'common/interfaces';
import { stateSelector } from './state-selector';
import { StoreState } from '../interfaces';

export const entitiesStateSelector = createSelector(stateSelector, (state) => state['entities'] || {});

export const entitiesSelector = (entityType: ENTITY_TYPES): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesStateSelector, (entitiesState) => entitiesState[entityType] || {});

export const entitiesDataSelector = (entityType: ENTITY_TYPES): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesSelector(entityType), (entityInfo) => {
        return entityInfo['data'] || [];
    });

export const entitiesStatusSelector = (entityType: ENTITY_TYPES): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesSelector(entityType), (entityInfo) => entityInfo['status']);

export const entitySelector = (entityType: ENTITY_TYPES) => (
    property: string,
    value: number | string,
): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesDataSelector(entityType), (entitiesData) =>
        entitiesData.find((entity: Entity) => entity[property] === value, null, {}),
    );
