import { Action } from 'redux';
import { REQUEST_STATUSES } from 'common/consts';
import { ImmutableMap } from 'common/interfaces';

import { AUTHENTICATION_ACTIONS } from './consts';

export interface AuthenticationLoginSuccessAction {
    type: AUTHENTICATION_ACTIONS.LOGIN_SUCCESS;
}

export type AuthenticationAction = Action<
    Exclude<AUTHENTICATION_ACTIONS, AUTHENTICATION_ACTIONS.LOGIN_SUCCESS> | AuthenticationLoginSuccessAction
>;

export type AuthState = ImmutableMap<{
    status: REQUEST_STATUSES;
}>;
