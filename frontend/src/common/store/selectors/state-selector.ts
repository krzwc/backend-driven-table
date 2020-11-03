import { Selector } from 'reselect';
import { StoreState } from 'common/store/interfaces';

export const stateSelector: Selector<StoreState, StoreState> = (state) => state;
