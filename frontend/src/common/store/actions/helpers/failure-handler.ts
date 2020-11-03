import { ENTITY_TYPES } from 'common/consts';
import { ResponseError } from 'common/http-service/interfaces';
/* import { CommonThunkDispatch, StoreState } from '../../interfaces'; */

export const showErrorNotification = (errorMsg: string): void => {
    /* eslint-disable */
    console.log(errorMsg);
};

interface FailureHandlerSettings {
    entityType: ENTITY_TYPES;
    onFailure?(error: ResponseError): void;
}

export const failureHandler = ({ onFailure /* , entityType */ }: FailureHandlerSettings) =>
    /* state: StoreState,
    dispatch: CommonThunkDispatch, */
    (error: ResponseError): void => {
        showErrorNotification(error.message);
        if (onFailure) {
            onFailure(error);
        }

        /* return dispatch(entityRequestFailure(entityType)); */
    };
