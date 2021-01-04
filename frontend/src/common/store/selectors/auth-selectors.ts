import { createSelector, Selector } from 'reselect';
import { REQUEST_STATUSES } from 'common/consts';
import { StoreState } from 'common/store/interfaces';
import { AuthState } from 'common/store/actions/auth/interfaces';

import { stateSelector } from './state-selector';

export const authStateSelector: Selector<StoreState, AuthState> = createSelector(
    stateSelector,
    (state) => state['auth'],
);

export const authStatusSelector: Selector<StoreState, REQUEST_STATUSES> = createSelector(
    authStateSelector,
    (authState) => authState['status'],
);

export const authTokenSelector: Selector<StoreState, string> = createSelector(
    authStateSelector,
    (authState) => authState['token'],
);
