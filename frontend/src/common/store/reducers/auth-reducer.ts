import { Map } from 'immutable';
import { Reducer } from 'redux';

import { AuthenticationAction } from 'common/store/actions/auth/interfaces';
import { AUTHENTICATION_ACTIONS } from 'common/store/actions/auth/consts';
import { isAuthenticationLoginSuccessAction } from 'common/store/actions/auth/helpers';
import { REQUEST_STATUSES } from 'common/consts';

const initialState = Map();

export type AuthReducer = Reducer<Map<unknown, unknown>, AuthenticationAction>;

export const authReducer: AuthReducer = (state = initialState, action: AuthenticationAction) => {
    const { type } = action;

    switch (type) {
        case AUTHENTICATION_ACTIONS.LOGIN_START:
            return state.withMutations((mutableState) => {
                mutableState.set('status', REQUEST_STATUSES.PENDING);
            });

        case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
            if (isAuthenticationLoginSuccessAction(action)) {
                const { payload } = action;
                return state.withMutations((mutableState) => {
                    mutableState.set('status', REQUEST_STATUSES.SUCCESS);
                    mutableState.set('token', payload);
                });
            }
            return state.withMutations((mutableState) => {
                mutableState.set('status', REQUEST_STATUSES.FAILURE);
            });

        case AUTHENTICATION_ACTIONS.LOGIN_FAILURE:
            return state.withMutations((mutableState) => {
                mutableState.set('status', REQUEST_STATUSES.FAILURE);
            });

        default:
            return state;
    }
};
