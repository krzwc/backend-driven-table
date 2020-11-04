import { CommonThunkAction, EntitiesAction, EntityData } from 'common/store/interfaces';
import { HttpService } from 'common/http-service/http-service';
import { failureHandler } from './helpers/failure-handler';
import { entityRequestStart } from './action-request-start';
import { getActionSettings } from './helpers/get-action-settings';
import { EntityResponse } from 'common/interfaces';
import { ResponseError } from 'common/http-service/interfaces';
import { ENTITY_ACTION_TYPES, ENTITY_TYPES, ENTITY_ACTIONS } from 'common/consts';
import { readDependencies } from './read-dependencies';
/* import { isEqual } from '../../helpers'; */

const http = HttpService.getInstance();

interface DeleteEntity {
    actions: { actionType: ENTITY_ACTION_TYPES; successAction: ENTITY_ACTIONS };
    entityType: ENTITY_TYPES;
    entityData: EntityData;
    callbacks: {
        onSuccess: (param: EntityResponse) => void;
        onFailure: (param: ResponseError) => void;
    };
}

export const deleteEntity = ({
    actions = {
        successAction: ENTITY_ACTIONS.DELETE_ENTITY_SUCCESS,
        actionType: ENTITY_ACTION_TYPES.DELETE,
    },
    entityType,
    entityData = {} as EntityData,
    callbacks,
}: DeleteEntity): CommonThunkAction<void | EntitiesAction> => (dispatch, getState) => {
    const state = getState();
    const { onSuccess, onFailure } = callbacks || {};
    const { actionType, successAction } = actions;
    const actionSettings = getActionSettings(
        {
            entityType,
            entityData,
            actionType,
        },
        state,
    );
    const {
        url,
        headers,
        dependencies,
        replaceMode,
        customRequestMethod,
        transformRequestBody,
        transformResponseBody,
        /* notifications: { success, fail } */
    } = actionSettings;

    // TODO: if transformedRequestBody === entityData.body -> ignore

    dispatch(entityRequestStart(entityType));

    const body = JSON.stringify(transformRequestBody);

    const method = customRequestMethod
        ? customRequestMethod(
              actionSettings,
              {
                  ...entityData,
                  body,
              },
              state,
          )
        : http.delete(url, headers);

    return method
        .then((response) => {
            const transformedResponse = transformResponseBody ? transformResponseBody(response) : response;

            const payload = { data: entityData.id };

            if (onSuccess) {
                onSuccess(transformedResponse);
            }

            if (dependencies && dependencies.length) {
                readDependencies(dependencies, state, dispatch);
                if (dependencies.some(({ entityType: type }) => type === entityType)) {
                    return;
                }
            }

            return dispatch({
                type: successAction,
                payload: {
                    entityType,
                    ...payload,
                },
            });
        })
        .catch(
            failureHandler(
                {
                    entityType,
                    onFailure,
                    replaceMode,
                },
                state,
                dispatch,
            ),
        );
};
