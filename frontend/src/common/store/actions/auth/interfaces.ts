import { Action } from 'redux';
import { REQUEST_STATUSES } from 'common/consts';

import { AUTHENTICATION_ACTIONS } from './consts';

export interface AuthenticationLoginSuccessAction {
    type: AUTHENTICATION_ACTIONS.LOGIN_SUCCESS;
    payload: string;
}

export type AuthenticationAction =
    | Action<Exclude<AUTHENTICATION_ACTIONS, AUTHENTICATION_ACTIONS.LOGIN_SUCCESS>>
    | AuthenticationLoginSuccessAction;

export type AuthState = {
    status: REQUEST_STATUSES;
    token: string;
};
