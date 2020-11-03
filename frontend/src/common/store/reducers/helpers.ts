import { fromJS, List, Map } from 'immutable';
import { Entity } from 'common/interfaces';
import { EntitiesPayload } from 'common/store/interfaces';
import { isNotEmpty } from 'common/helpers';

export const basicStoreKeys = [
    'data',
    /* 'page',
    'search',
    'filters'
    'additionalData' */
];

export const updateSingleEntity = (
    stateEntities: List<Entity>,
    data: { [key: string]: any },
    replaceMode = false,
): List<Entity> => {
    if (replaceMode) {
        return fromJS(data);
    }

    const matchedIndex = stateEntities.findIndex(
        (entity) =>
            // Parent entity
            (data.id && entity.get('id') === data.id) ||
            // Child entity
            (!data.id && data.parent_id && data.parent_id === entity.get('parent_id')),
    );

    return matchedIndex > -1
        ? stateEntities.update(matchedIndex, () => fromJS(data))
        : stateEntities.push(fromJS(data));
};

interface MutateState {
    key: string;
    payload: EntitiesPayload;
}

export const mutateState = ({ key, payload }: MutateState) => (
    mutableState: Map<unknown, unknown>,
    mutatedObject: { [key: string]: any } = {} as EntitiesPayload,
): any => {
    if (
        mutatedObject[key] ||
        (isNotEmpty(payload[key as keyof EntitiesPayload]) && payload[key as keyof EntitiesPayload])
    ) {
        mutableState.setIn(
            [payload.entityType, key],
            fromJS(mutatedObject[key] || payload[key as keyof EntitiesPayload]),
        );
    }
};
