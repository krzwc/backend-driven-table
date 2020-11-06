import { ENTITY_TYPES } from 'common/consts';
import { ResponseError } from 'common/http-service';
import { CommonThunkDispatch, StoreState } from 'common/store/interfaces';
import { entityRequestFailure } from '../entity-request-failure';
import { EntitiesAction } from 'common/store/interfaces';

export const showErrorNotification = (errorMsg: string): void => {
    /* eslint-disable */
    console.log(errorMsg);
};

interface FailureHandlerSettings {
    entityType: ENTITY_TYPES;
    onFailure?(error: ResponseError): void;
    replaceMode: boolean;
}

export const failureHandler = (
    { onFailure, entityType, replaceMode }: FailureHandlerSettings,
    state: StoreState,
    dispatch: CommonThunkDispatch,
) => (error: ResponseError): EntitiesAction => {
    showErrorNotification(error.message);
    if (onFailure) {
        onFailure(error);
    }

    return dispatch(entityRequestFailure(entityType, replaceMode));
};
