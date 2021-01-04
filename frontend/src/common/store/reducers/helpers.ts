import { Entity } from 'common/interfaces';

export const basicStoreKeys = [
    'data',
    /* 'page',
    'search',
    'filters'
    'additionalData' */
];

export const updateSingleEntity = (stateEntities: Entity[], data: Entity, replaceMode = false): Entity[] => {
    if (replaceMode) {
        return [data];
    }

    const matchedIndex = stateEntities.findIndex(
        (entity) =>
            // Parent entity
            (data.id && entity['id'] === data.id) ||
            // Child entity
            (!data.id && data.parent_id && data.parent_id === entity['parent_id']),
    );
    if (matchedIndex > -1) {
        stateEntities[matchedIndex] = data;
    } else {
        stateEntities.push(data);
    }

    return stateEntities;
};

export const removeFromArray = <T>(array: T[], element: T): void => {
    const index = array.indexOf(element);
    array.splice(index, 1);
};
