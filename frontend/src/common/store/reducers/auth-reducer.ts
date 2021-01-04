import produce, { Draft } from 'immer';

import { AuthenticationAction } from 'common/store/actions/auth/interfaces';
import { AUTHENTICATION_ACTIONS } from 'common/store/actions/auth/consts';
import { isAuthenticationLoginSuccessAction } from 'common/store/actions/auth/helpers';
import { REQUEST_STATUSES } from 'common/consts';

export type AuthReducerState = Record<string, any>;

export const authReducer = produce((draft: Draft<AuthReducerState>, action: AuthenticationAction) => {
    const { type } = action;

    switch (type) {
        case AUTHENTICATION_ACTIONS.LOGIN_START:
            draft['status'] = REQUEST_STATUSES.PENDING;
            return;

        case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS:
            if (isAuthenticationLoginSuccessAction(action)) {
                const { payload } = action;
                draft['status'] = REQUEST_STATUSES.SUCCESS;
                draft['token'] = payload;
                return;
            }
            draft['status'] = REQUEST_STATUSES.FAILURE;
            return;

        case AUTHENTICATION_ACTIONS.LOGIN_FAILURE:
            draft['status'] = REQUEST_STATUSES.FAILURE;
            return;
    }
}, {});
