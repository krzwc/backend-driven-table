import { URLS, BASE_URL } from 'common/consts';
import { CommonThunkAction } from 'common/store/interfaces';
import { HttpService } from 'common/http-service';
import { LoginResponse } from 'common/interfaces';

import { showErrorNotification } from '../helpers';
import { AUTHENTICATION_ACTIONS } from './consts';

const http = HttpService.getInstance();

const authenticationStart = () => ({
    type: AUTHENTICATION_ACTIONS.LOGIN_START as AUTHENTICATION_ACTIONS.LOGIN_START,
});

const authenticationFailure = () => ({
    type: AUTHENTICATION_ACTIONS.LOGIN_FAILURE as AUTHENTICATION_ACTIONS.LOGIN_FAILURE,
});

const login = (body: BodyInit): CommonThunkAction<void | LoginResponse> => (dispatch) => {
    dispatch(authenticationStart());

    return http
        .post(
            HttpService.toURL([BASE_URL, URLS.USER_DATA, URLS.LOGIN]),
            { 'Content-Type': 'application/json' },
            JSON.stringify(body),
        )
        .then((response) => {
            dispatch({ type: AUTHENTICATION_ACTIONS.LOGIN_SUCCESS, payload: (response as LoginResponse).jwt_token });

            return response;
        })
        .catch((error) => {
            showErrorNotification(error);
            dispatch(authenticationFailure());

            return Promise.reject(error);
        }) as Promise<LoginResponse>;
};

export { login };
