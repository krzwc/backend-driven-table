import { ThunkAction } from 'redux-thunk';
import { HandleThunkActionCreator } from 'react-redux';

type ThunkActionCreator = (...params: any[]) => ThunkAction<any, any, any, any>;

/* *
 * Unwraps the thunk tu use in mapDispatchToProps
 */

export const thunkDispatchify = <T extends ThunkActionCreator>(thunkActionCreator: T) =>
    thunkActionCreator as HandleThunkActionCreator<T>;
