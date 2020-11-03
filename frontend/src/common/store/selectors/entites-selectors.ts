import { List, Map } from 'immutable';
import { createSelector, OutputSelector } from 'reselect';
import { ENTITY_TYPES } from 'common/consts';
import { Entity } from 'common/interfaces';
import { stateSelector } from './state-selector';
import { StoreState } from '../interfaces';

export const entitiesStateSelector = createSelector(stateSelector, (state) => state.get('entities', Map()));

export const entitiesSelector = (entityType: ENTITY_TYPES): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesStateSelector, (entitiesState) => entitiesState.get(entityType, Map()));

export const entitiesDataSelector = (entityType: ENTITY_TYPES): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesSelector(entityType), (entityInfo) => {
        return entityInfo.get('data', List());
    });

export const entitiesStatusSelector = (entityType: ENTITY_TYPES): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesSelector(entityType), (entityInfo) => entityInfo.get('status'));

export const entitySelector = (entityType: ENTITY_TYPES) => (
    property: string,
    value: number | string,
): OutputSelector<StoreState, any, (res: any) => any> =>
    createSelector(entitiesDataSelector(entityType), (entitiesData) =>
        entitiesData.find((entity: Entity) => entity.get(property) === value, null, Map()),
    );
