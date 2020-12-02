import { AuthenticationLoginSuccessAction, AuthenticationAction } from './interfaces';

export const isAuthenticationLoginSuccessAction = (
    action: AuthenticationAction,
): action is AuthenticationLoginSuccessAction => {
    return (action as AuthenticationLoginSuccessAction).payload !== undefined;
};
