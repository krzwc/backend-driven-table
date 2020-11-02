import { ENTITY_TYPES } from '../../../consts';
import { ResponseError } from '../../../http-service/interfaces';
import { CommonThunkDispatch, StoreState } from '../../interfaces';

export const showErrorNotification = (errorMsg: string) => console.log(errorMsg);

interface FailureHandlerSettings {
    entityType: ENTITY_TYPES;
    onFailure?(error: ResponseError): void;
}

export const failureHandler = (
    { onFailure, entityType }: FailureHandlerSettings,
    state: StoreState,
    dispatch: CommonThunkDispatch,
) => (error: ResponseError) => {
    showErrorNotification(error.message!);
    if (onFailure) {
        onFailure(error);
    }

    /* return dispatch(entityRequestFailure(entityType)); */
};
