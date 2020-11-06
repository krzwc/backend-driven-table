import { MODELS } from 'common/models/index';
import { BaseModelProps } from 'common/interfaces';
import { StoreState, EntityData } from 'common/store/interfaces';
import { HttpService } from 'common/http-service';
import { ENTITY_ACTION_TYPES, ENTITY_TYPES } from 'common/consts';
import { get } from 'common/helpers';
import { ObjectType } from 'common/interfaces';

const http = HttpService.getInstance();

interface RequestData {
    entityType: ENTITY_TYPES;
    entityData?: EntityData;
    actionType: keyof typeof ENTITY_ACTION_TYPES;
}

type EntityActionRequestSettings = Required<BaseModelProps>;

type GetRequestSettings = (data: RequestData, state: StoreState) => EntityActionRequestSettings;

export const getActionSettings: GetRequestSettings = ({ entityType, actionType }, _state: StoreState) => {
    const model = MODELS[entityType];
    const modelActions = (get(model, ['actions', actionType], {}) as ObjectType) || {};
    const actionSettings = { ...model, ...modelActions } as EntityActionRequestSettings;

    const {
        headers,
        url,
        replaceMode,
        dependencies = [],
        /* notifications = {}, */
        customRequestMethod,
        transformRequestBody,
        transformResponseBody,
    } = actionSettings;

    return {
        dependencies,
        /* notifications, */
        customRequestMethod,
        transformRequestBody,
        transformResponseBody,
        url,
        headers: http.enhanceHeaders(headers),
        replaceMode,
    };
};
