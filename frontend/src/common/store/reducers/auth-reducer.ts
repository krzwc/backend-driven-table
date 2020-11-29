import { Map } from 'immutable';

import { AuthenticationAction } from 'common/store/actions/auth/interfaces';
import { AUTHENTICATION_ACTIONS } from 'common/store/actions/auth/consts';
import { REQUEST_STATUSES } from 'common/consts';

const initialState = Map();

export const authReducer = (state = initialState, action: AuthenticationAction) => {
    const { type } = action;

    switch (type) {
        case AUTHENTICATION_ACTIONS.LOGIN_START:
            return state.withMutations((mutableState) => {
                mutableState.set('status', REQUEST_STATUSES.PENDING);
            });

        case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
            return state.withMutations((mutableState) => {
                mutableState.set('status', REQUEST_STATUSES.SUCCESS);
            });

        case AUTHENTICATION_ACTIONS.LOGIN_FAILURE:
            return state.withMutations((mutableState) => {
                mutableState.set('status', REQUEST_STATUSES.FAILURE);
            });

        default:
            return state;
    }
};
