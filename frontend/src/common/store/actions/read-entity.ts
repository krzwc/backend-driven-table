import { CommonThunkAction, EntitiesAction, EntityData } from 'common/store/interfaces';
import { HttpService } from 'common/http-service/http-service';

import { failureHandler } from './helpers/failure-handler';
import { entityRequestStart } from './action-request-start';
import { getActionSettings } from './helpers/get-action-settings';
import { readDependencies } from './read-dependencies';
import { EntityResponse } from 'common/interfaces';
import { ResponseError } from 'common/http-service/interfaces';
import { ENTITY_ACTIONS, ENTITY_ACTION_TYPES, ENTITY_TYPES } from 'common/consts';

const http = HttpService.getInstance();

interface ReadEntity {
    actions: { settingsActionType: ENTITY_ACTION_TYPES; successAction: ENTITY_ACTIONS };
    entityType: ENTITY_TYPES;
    entityData: EntityData;
    callbacks: {
        onSuccess: (param: EntityResponse) => void;
        onFailure: (param: ResponseError) => void;
    };
}

export const readEntity = ({
    actions = {
        successAction: ENTITY_ACTIONS.READ_ENTITY_SUCCESS,
        settingsActionType: ENTITY_ACTION_TYPES.READ,
    },
    entityType,
    entityData = {} as EntityData,
    callbacks,
}: ReadEntity): CommonThunkAction<void | EntitiesAction> => (dispatch, getState) => {
    const state = getState();
    const { onSuccess, onFailure } = callbacks || {};
    const { settingsActionType, successAction } = actions;
    const actionSettings = getActionSettings({ entityType, entityData, actionType: settingsActionType }, state);
    const {
        url,
        headers,
        dependencies,
        customRequestMethod,
        transformResponseBody,
        /* notifications: { success, fail } */
    } = actionSettings;

    dispatch(entityRequestStart(entityType));

    if (dependencies && dependencies.length) {
        readDependencies(dependencies, state, dispatch);
    }

    const method = customRequestMethod
        ? customRequestMethod(actionSettings, entityData, state)
        : http.get(url, headers);

    return method
        .then((response) => {
            const transformedResponse = transformResponseBody ? transformResponseBody(response) : response;
            const { data /* , ...rest */ } = transformedResponse;

            const payload = data ? { data: data || [] } : { data: transformedResponse };

            if (onSuccess) {
                onSuccess(transformedResponse);
            }

            /* if (success) {
                showSuccessNotification(
                    isFunction(success) ? successAction(transformedResponse, state) : success
                )
            }; */

            return dispatch({
                type: successAction,
                payload: {
                    entityType,
                    ...payload,
                },
            });
        })
        .catch(failureHandler({ entityType, onFailure } /* , state, dispatch */));
};
