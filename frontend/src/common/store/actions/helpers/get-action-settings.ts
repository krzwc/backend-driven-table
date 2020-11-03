import { MODELS } from '../../../models/index';
import { BaseModelProps } from '../../../interfaces';
import { StoreState, EntityData } from '../../interfaces';
import { HttpService } from '../../../http-service/http-service';
import { ENTITY_ACTION_TYPES, ENTITY_TYPES } from '../../../consts';
import { get } from '../../../helpers';
import { ObjectType } from '../../../interfaces';

const http = HttpService.getInstance();

interface RequestData {
    entityType: ENTITY_TYPES;
    entityData?: EntityData;
    actionType: keyof typeof ENTITY_ACTION_TYPES;
}

type EntityActionRequestSettings = Required<BaseModelProps>;

export type GetRequestSettings = (data: RequestData, state: StoreState) => EntityActionRequestSettings;

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
