import { ENTITY_ACTIONS, ENTITY_ACTION_TYPES } from 'common/consts';
import { HttpService } from 'common/http-service/http-service';
import { EntityDependency } from 'common/interfaces';
import { CommonThunkDispatch, StoreState } from 'common/store/interfaces';
import { getActionSettings } from './helpers/get-action-settings';
import { showErrorNotification } from './helpers/failure-handler';

const http = HttpService.getInstance();

export const readDependencies = (
    dependencies: EntityDependency[],
    state: StoreState,
    dispatch: CommonThunkDispatch,
): void => {
    const dependenciesSettings = dependencies.map(({ entityType }) => {
        const actionSettings = getActionSettings({ entityType, actionType: ENTITY_ACTION_TYPES.READ }, state);

        const { url, customRequestMethod, headers } = actionSettings;

        return {
            entityType,
            actionSettings,
            requestPromise: customRequestMethod
                ? customRequestMethod({ ...actionSettings, initiateByDependency: true }, state)
                : http.get(url, headers),
        };
    });

    Promise.all(dependenciesSettings.map((dependencySetting) => dependencySetting.requestPromise))
        .then((responses) => {
            dependenciesSettings.forEach(({ actionSettings, entityType }, index) => {
                const { transformResponseBody } = actionSettings;
                const singleResponse = transformResponseBody
                    ? transformResponseBody(responses[index])
                    : responses[index];
                const { data /* ...rest */ } = singleResponse;
                const payload = data ? { data } : { data: singleResponse };

                dispatch({
                    type: ENTITY_ACTIONS.READ_ENTITY_SUCCESS,
                    payload: {
                        entityType,
                        ...payload,
                    },
                });
            });
        })
        .catch(showErrorNotification);
};
