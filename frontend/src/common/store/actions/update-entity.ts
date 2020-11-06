import { CommonThunkAction, EntitiesAction, EntityData } from 'common/store/interfaces';
import { HttpService, ResponseError } from 'common/http-service';
import { failureHandler, getActionSettings } from './helpers';
import { entityRequestStart } from './action-request-start';
import { EntityResponse } from 'common/interfaces';
import { ENTITY_ACTIONS, ENTITY_ACTION_TYPES, ENTITY_TYPES } from 'common/consts';
import { readDependencies } from './read-dependencies';
import { noop, isFunction } from 'common/helpers';
import isEqual from 'lodash.isequal';

const http = HttpService.getInstance();

interface UpdateEntity {
    actions: { settingsActionType: ENTITY_ACTION_TYPES; successAction: ENTITY_ACTIONS };
    entityType: ENTITY_TYPES;
    entityData: EntityData;
    callbacks: {
        onSuccess: (param: EntityResponse) => void;
        onFailure: (param: ResponseError) => void;
    };
}

export const updateEntity = ({
    actions = {
        successAction: ENTITY_ACTIONS.UPDATE_ENTITY_SUCCESS,
        settingsActionType: ENTITY_ACTION_TYPES.UPDATE,
    },
    entityType,
    entityData = {} as EntityData,
    callbacks,
}: UpdateEntity): CommonThunkAction<void | EntitiesAction> => (dispatch, getState) => {
    const state = getState();
    const { onSuccess, onFailure } = callbacks || {};
    const { settingsActionType, successAction } = actions;
    const actionSettings = getActionSettings(
        {
            entityType,
            entityData,
            actionType: settingsActionType,
        },
        state,
    );
    const {
        url,
        headers,
        replaceMode,
        dependencies,
        customRequestMethod,
        transformRequestBody,
        transformResponseBody,
        /* notifications: { success, fail } */
    } = actionSettings;

    const transformedRequestBody = isFunction(transformRequestBody)
        ? transformRequestBody(entityData.body, entityData, state)
        : entityData.body;

    if (isEqual(entityData.body, transformedRequestBody)) {
        // TODO: show success notification -> Nothing to update
        return new Promise<void>(noop);
    }

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
        : http.put(url, headers, body);

    return method
        .then((response) => {
            const transformedResponse = transformResponseBody ? transformResponseBody(response) : response;
            const { data /* ...rest */ } = transformedResponse;

            const payload = data
                ? {
                      data: data || [],
                  }
                : {
                      data: transformedResponse,
                  };

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
                    replaceMode,
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
