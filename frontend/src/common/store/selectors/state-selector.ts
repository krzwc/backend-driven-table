import { Selector } from 'reselect';
import { StoreState } from '../interfaces';

export const stateSelector: Selector<StoreState, StoreState> = state => state;
